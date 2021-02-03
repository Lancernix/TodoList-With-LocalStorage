import React, { Component } from 'react';
import { List, Input, Card, Button, Col, Row } from 'antd';
import { CloseOutlined, CheckOutlined, StarFilled } from '@ant-design/icons';
import './App.css';

class App extends Component {
  state = {
    todoList: localStorage.getItem('my-todo-list')
      ? JSON.parse(localStorage.getItem('my-todo-list'))
      : [],
    newTodo: '',
  };

  // 保存新增 todo 到 state 中
  saveNewTodo = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  // 新增 todo
  addNewTodo = () => {
    const tempTodoList = this.state.todoList;
    tempTodoList.push({
      name: this.state.newTodo,
      finished: false,
      fav: false,
      createdDate: parseInt(Date.now() / 1000),
    });
    tempTodoList.sort(
      (a, b) =>
        a.finished - b.finished ||
        b.fav - a.fav ||
        b.createdDate - a.createdDate
    );
    this.setState({
      todoList: tempTodoList,
      newTodo: '',
    });
    localStorage.setItem('my-todo-list', JSON.stringify(this.state.todoList));
  };

  // 修改 todo 子项属性并保存
  changeTodoItemProp = (propName, item) => {
    return () => {
      const tempTodoList = this.state.todoList;
      item[propName] = !item[propName];
      const index = tempTodoList.indexOf(item);
      tempTodoList[index] = item;
      tempTodoList.sort(
        (a, b) =>
          a.finished - b.finished ||
          b.fav - a.fav ||
          b.createdDate - a.createdDate
      );
      this.setState({
        todoList: tempTodoList,
      });
      localStorage.setItem('my-todo-list', JSON.stringify(this.state.todoList));
    };
  };

  // 删除 todo 子项
  delTodoItem = (itemCreateDate) => {
    return () => {
      this.setState({
        todoList: this.state.todoList.filter(
          (item) => item.createdDate !== itemCreateDate
        ),
      });
      localStorage.setItem('my-todo-list', JSON.stringify(this.state.todoList));
    };
  };

  render() {
    return (
      <div className='App'>
        <Card title='My Todo List'>
          <List
            style={{ borderRadius: 8 }}
            bordered
            locale={{ emptyText: '暂无代办事项，尝试添加一个吧~~' }}
          >
            {!!this.state.todoList.length &&
              this.state.todoList.map((item) => (
                <List.Item
                  style={{
                    color: !item.finished ? 'initial' : '#cdd0cb',
                    textDecoration: item.finished ? 'line-through' : 'none',
                  }}
                  key={item.createdDate}
                  actions={[
                    <Button
                      size='small'
                      type='text'
                      className='finishBtn'
                      icon={<CheckOutlined />}
                      style={{ color: item.finished ? '#25b864' : '' }}
                      disabled={item.finished}
                      onClick={this.changeTodoItemProp('finished', item)}
                    ></Button>,
                    <Button
                      size='small'
                      type='text'
                      className='favBtn'
                      icon={<StarFilled />}
                      style={{ color: item.fav ? '#F22613' : '' }}
                      disabled={item.finished}
                      onClick={this.changeTodoItemProp('fav', item)}
                    ></Button>,
                    <Button
                      size='small'
                      type='text'
                      className='delBtn'
                      icon={<CloseOutlined />}
                      onClick={this.delTodoItem(item.createdDate)}
                    ></Button>,
                  ]}
                >
                  {item.name}
                </List.Item>
              ))}
          </List>

          <Row style={{ marginTop: 20 }}>
            <Col flex='auto'>
              <Input
                value={this.state.newTodo}
                onChange={this.saveNewTodo}
                style={{ borderRadius: 8 }}
                placeholder='Add a new todo item'
              />
            </Col>
            <Col flex='50px'>
              <Button
                type='primary'
                disabled={this.state.newTodo.trim() === ''}
                style={{ marginLeft: 4, borderRadius: 8 }}
                onClick={this.addNewTodo}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Card, Divider } from 'antd';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import './App.css';

export default class App extends Component {
  // 初始化状态
  state = {
    todoList: localStorage.getItem('my-todo-list')
      ? JSON.parse(localStorage.getItem('my-todo-list'))
      : [],
  };

  componentDidMount() {
    // 窗口关闭前将数据保存到 localStorage 中
    onbeforeunload = () => {
      localStorage.setItem('my-todo-list', JSON.stringify(this.state.todoList));
    };
  }

  // todoList 排序
  todoItemSort = (todoList) => {
    return todoList.sort(
      (a, b) => a.done - b.done || b.fav - a.fav || b.id - a.id
    );
  };
  // 新增 todoItem（用于 AddTodo 组件回调）
  addTodoItem = (newTodo) => {
    const todoList = [...this.state.todoList, newTodo];
    this.todoItemSort(todoList);
    this.setState({ todoList: todoList });
  };

  // 更新 todoItem（用于 todoList 组件回调）
  updateTodoItem = (id, propName) => {
    const todoList = this.state.todoList.filter((item) => item.id !== id);
    const item = this.state.todoList.find((item) => item.id === id);
    item[propName] = !item[propName];
    todoList.push(item);
    this.todoItemSort(todoList);
    this.setState({ todoList: todoList });
  };

  // 删除 todoItem（用于 todoList 组件回调）
  delTodoItem = (id) => {
    const todoList = this.state.todoList.filter((item) => item.id !== id);
    this.todoItemSort(todoList);
    this.setState({ todoList: todoList });
  };

  // 删除已完成的 todoItem（用于 Footer 组件回调）
  delDoneTodos = () => {
    const todoList = this.state.todoList.filter((item) => !item.done);
    this.todoItemSort(todoList);
    this.setState({ todoList: todoList });
  };

  render() {
    return (
      <div className='App'>
        <Card title='My Todo List'>
          <TodoList
            todoList={this.state.todoList}
            updateTodoItem={this.updateTodoItem}
            delTodoItem={this.delTodoItem}
          />
          <AddTodo addTodoItem={this.addTodoItem} />
          <Divider style={{ margin: '16px 0' }} />
          <Footer
            todoList={this.state.todoList}
            delDoneTodos={this.delDoneTodos}
          />
        </Card>
      </div>
    );
  }
}

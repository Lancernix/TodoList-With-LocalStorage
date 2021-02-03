import React, { Component } from 'react';
import { List } from 'antd';
import TodoItem from '../TodoItem';

export default class TodoList extends Component {
  render() {
    const { todoList, updateTodoItem, delTodoItem } = this.props;
    return (
      <List
        style={{ borderRadius: 8 }}
        bordered
        locale={{ emptyText: '暂无代办事项，尝试添加一个吧~~' }}
      >
        {!!todoList.length &&
          todoList.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              {...todoItem}
              updateTodoItem={updateTodoItem}
              delTodoItem={delTodoItem}
            />
          ))}
      </List>
    );
  }
}

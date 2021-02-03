import React, { Component } from 'react';
import { Input } from 'antd';

export default class AddTodo extends Component {
  state = { newTodo: '' };
  handleKeyUp = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    if (this.state.newTodo.trim() === '') {
      alert('输入不能为空');
      return;
    }
    this.props.addTodoItem({
      id: Date.now(),
      name: this.state.newTodo,
      done: false,
      fav: false,
    });
    this.setState({ newTodo: '' });
  };

  render() {
    return (
      <Input
        value={this.state.newTodo}
        style={{ borderRadius: 8, marginTop: 10 }}
        placeholder='Add a new todo item'
        onChange={(e) => this.setState({ newTodo: e.target.value })}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}

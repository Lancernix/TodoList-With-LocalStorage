import React, { Component } from 'react';
import { List, Button } from 'antd';
import { CloseOutlined, CheckOutlined, StarFilled } from '@ant-design/icons';
import './index.css';

export default class TodoItem extends Component {
  handleUpdate = (id, propName) => {
    return () => {
      this.props.updateTodoItem(id, propName);
    };
  };
  handleDel = (id) => {
    return () => {
      this.props.delTodoItem(id);
    };
  };

  render() {
    const { id, name, done, fav } = this.props;
    return (
      <List.Item
        style={{
          color: !done ? 'initial' : '#cdd0cb',
          textDecoration: done ? 'line-through' : 'none',
        }}
        actions={[
          <Button
            size='small'
            type='text'
            className='actionBtn'
            icon={<CheckOutlined />}
            style={{ color: done ? '#25b864' : '' }}
            disabled={done}
            onClick={this.handleUpdate(id, 'done')}
          ></Button>,
          <Button
            size='small'
            type='text'
            className='actionBtn'
            icon={<StarFilled />}
            style={{ color: fav ? '#F22613' : '' }}
            disabled={done}
            onClick={this.handleUpdate(id, 'fav')}
          ></Button>,
          <Button
            size='small'
            type='text'
            className='actionBtn'
            icon={<CloseOutlined />}
            onClick={this.handleDel(id)}
          ></Button>,
        ]}
      >
        {name}
      </List.Item>
    );
  }
}

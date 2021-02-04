import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

export default class Footer extends Component {
  handleDelDone = () => {
    this.props.delDoneTodos();
  };

  render() {
    const doneCount = this.props.todoList.reduce(
      (total, cur) => total + (cur.done ? 1 : 0),
      0
    );
    return (
      <Row align='middle'>
        <Col flex={1}>
          <span>已完成待办：</span>
          <span>{doneCount}</span>
        </Col>
        <Col flex={1}>
          <Button
            type='primary'
            danger
            style={{ borderRadius: 8 }}
            disabled={doneCount === 0}
            onClick={this.handleDelDone}
          >
            删除所有完成待办
          </Button>
        </Col>
      </Row>
    );
  }
}

import React, { FC } from 'react';

import {AutoComplete, Button, Card, Space, Form} from 'antd';
import {User} from "../data/user";


interface QuestionSubmitProps {
  user: User,
  onSubmit: (user: User, text: string) => void
}

export const QuestionSubmit: FC<QuestionSubmitProps> = (props: QuestionSubmitProps) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    //props.onSubmit(this.props.)
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card
      // margin: vertical | horizontal
      style={{ margin: "30px 0" }}
    >
      <Form
        name="newQuestion"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
          name="text"
          rules={[{ required: true }]}
        >
          <AutoComplete
           style={{ width: "100%" }}
           placeholder="What do you want to ask?"
          />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Ask
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  // return (
  //   <Card
  //     // margin: vertical | horizontal
  //     style={{ margin: "30px 0" }}
  //   >
  //     <Space direction="vertical" size="small" style={{ display: 'flex' }}>
  //       <AutoComplete
  //         style={{ width: "100%" }}
  //         placeholder="What do you want to ask?"
  //       />
  //       <Button type="primary" >Ask</Button>
  //     </Space>
  //   </Card>
  // );
}


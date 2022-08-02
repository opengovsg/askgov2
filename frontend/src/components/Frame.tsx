import React, { FC, useState, ReactInstance } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import {State, initialState, AppState} from "../data/state";
import { SelectEventHandler } from "rc-menu/lib/interface"

import { Layout, Select, Typography, Menu, MenuProps, AutoComplete, Col, Row, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;


interface FrameProps {
  appState: AppState,
}


export const Frame: FC<FrameProps> = (props: FrameProps) => {
  const navigate = useNavigate();
  const currentUser = props.appState.getCurrentUser();

  let menuItems: MenuProps['items'] = [
    {key: 1, label: 'Home'},
  ]
  if (currentUser && currentUser.canAnswer) {
    menuItems.push({key: 2, label: 'Answer'});
  }
  if (currentUser && currentUser.canScreen) {
    menuItems.push({key: 3, label: 'Screen'});
  }

  const onSelect: SelectEventHandler = ({ item, key, keyPath, domEvent }) => {
    switch (key) {
      case "2":
        navigate("/answer");
        break;
      case "3":
        navigate("/screen");
        break;
      default:
        navigate("/");
        break;
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col span={13}>
            <Typography.Title level={1} style={{ float: "left", color: "whitesmoke", marginTop: "10px", marginRight: "30px" }}>
              AskGov
            </Typography.Title>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} onSelect={onSelect}/>
          </Col>
          <Col span={11}>
            <Button
              shape="circle"
              icon={<UserOutlined />}
              size="large"
              style={{ float: "right", margin: "12px 10px" }}
            />
            {/* margin: vertical | horizontal */}
            <AutoComplete
              style={{ width: 300, float: "right", margin: "16px 10px" }}
            >
              <Input.Search placeholder="Search AskGov"  />
            </AutoComplete>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}


import React, { FC, useState, ReactInstance } from 'react'
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import { SelectEventHandler } from 'rc-menu/lib/interface'

import {
  Layout,
  Select,
  Typography,
  Menu,
  MenuProps,
  AutoComplete,
  Col,
  Row,
  Button,
  Input,
  Popover,
  notification,
  Popconfirm,
  Badge,
  Card,
  Alert,
  Divider,
  Space,
} from 'antd'
import type { LegacyButtonType } from 'antd/lib/button/button'
import type { PopconfirmProps } from 'antd/lib/popconfirm'
import { UserOutlined } from '@ant-design/icons'
import { routes } from '../constants'
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  api,
  postQuestions,
  useWhoamiQuery,
  useLogoutUserMutation,
  useLoginUrlQuery,
  useLogoutOfficerMutation,
  useLogoutMutation,
} from '../api'
import { User, Officer } from '../data'
import { Footer } from 'antd/es/layout/layout'
import { LoginPrompt } from './LoginPrompt'
import { useGlobalSearchParams } from './links'

const { Header, Content } = Layout

// type ContextType = {
//   selectedMenuKey: string
//   setSelectedMenuKey: (selectedMenuKey: string) => void
// }
// export function useSelectedMenuKey() {
//   return useOutletContext<ContextType>()
// }

const feedbackUrl = 'https://go.gov.sg/askgov-feedback'

type ContextType = {
  checkLogin: () => boolean
  currentUser?: User
  currentOfficer?: Officer
}
export function useCheckLogin() {
  return useOutletContext<ContextType>()
}

interface FrameProps {}

function userPopconfirmContent(
  queryResult: UseQueryResult<{
    currentUser: User | null
    currentOfficer: Officer | null
  }>,
  login: () => void,
  logout: () => void,
  officer: () => void,
): PopconfirmProps {
  const { isLoading, isError, error, data } = queryResult

  if (isLoading) {
    return {
      title: () => <span>Loading...</span>,
      okText: 'OK',
      okType: 'ghost',
      onConfirm: () => {},
      showCancel: false,
    }
  } else if (isError) {
    console.log(`Current User load error: ${error}`)
    return {
      title: () => <span>Error</span>,
      okText: 'Bummer',
      okType: 'ghost',
      onConfirm: () => {},
      showCancel: false,
    }
  } else if (!data.currentUser && !data.currentOfficer) {
    return {
      title: () => <span>Not signed in</span>,
      okText: 'Sign In',
      okType: 'ghost',
      onConfirm: login,
      showCancel: false,
    }
  } else if (data.currentUser && !data.currentOfficer) {
    // const publicName = data.currentUser.publicName
    return {
      title: () => <span>Signed In</span>,
      okText: 'Sign Out',
      okType: 'ghost',
      onConfirm: logout,
      showCancel: false,
    }
  } else if (!data.currentUser && data.currentOfficer) {
    // const publicName = data.currentUser.publicName
    return {
      title: () => <span>Signed in as {data.currentOfficer?.email} </span>,
      okText: 'Sign Out',
      okType: 'ghost',
      onConfirm: logout,
      showCancel: true,
      cancelText: 'Profile',
      onCancel: officer,
    }
  } else {
    return {
      title: () => (
        <span>
          Signed in as {data.currentOfficer?.email} and member of the public{' '}
        </span>
      ),
      okText: 'Sign Out',
      okType: 'ghost',
      onConfirm: logout,
      showCancel: true,
      cancelText: 'Profile',
      onCancel: officer,
    }
  }
}

export const Frame: FC<FrameProps> = (props: FrameProps) => {
  const navigate = useNavigate()
  const userQueryResult = useWhoamiQuery()
  const { data } = useLoginUrlQuery(userQueryResult.data)
  const url = data?.url
  const logoutMutation = useLogoutMutation()
  const globalSearchParams = useGlobalSearchParams()
  const logout = () => {
    logoutMutation.mutate()
  }
  const login = () => {
    if (url) window.location.replace(url)
  }
  const officer = () => {
    navigate(`${routes.officer}?${globalSearchParams}`)
  }
  const popconfirmProps = userPopconfirmContent(
    userQueryResult,
    login,
    logout,
    officer,
  )

  let menuItems: MenuProps['items'] = [{ key: routes.index, label: 'Home' }]
  // if (currentUser && currentUser.canAnswer) {
  //   menuItems.push({ key: routes.answer, label: 'Answer' })
  // }
  // if (currentUser && currentUser.canScreen) {
  //   menuItems.push({ key: routes.screen, label: 'Screen' })
  // }

  const onSelect: SelectEventHandler = ({ item, key, keyPath, domEvent }) => {
    switch (key) {
      case routes.answer:
        navigate(`${routes.answer}?${globalSearchParams}`)
        break
      case routes.screen:
        navigate(`${routes.screen}?${globalSearchParams}`)
        break
      default:
        navigate(`${routes.index}?${globalSearchParams}`)
        break
    }
  }

  const [isLoginPromptVisible, setIsLoginPromptVisible] = useState(false)
  const checkLogin = () => {
    if (userQueryResult.data?.currentUser) {
      return true
    } else {
      setIsLoginPromptVisible(true)
      return false
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col span={22}>
            <Link to={`${routes.index}?${globalSearchParams}`}>
              <Badge count={'alpha'} offset={[-20, 15]} color="blue">
                <div>
                  <Typography.Title
                    level={1}
                    style={{
                      color: 'whitesmoke',
                      marginTop: '10px',
                      marginRight: '30px',
                    }}
                  >
                    Can.Ask.Gov
                  </Typography.Title>
                </div>
              </Badge>
            </Link>
          </Col>
          <Col span={2}>
            <Popconfirm
              placement="bottom"
              icon={null}
              trigger="click"
              style={{ marginLeft: 'auto' }}
              {...popconfirmProps}
            >
              <Button
                shape="circle"
                icon={<UserOutlined />}
                size="large"
                style={{ margin: '12px 10px' }}
                // href="https://api.id.gov.sg/v1/oauth/authorize?client_id=CANASKGOV-TEST&scope=openid%20myinfo.name%20myinfo.nric_number&response_type=code&redirect_uri=http://localhost:6174/api/v1/sgid/callback&state=state"
                href="https://api.id.gov.sg/v1/oauth/authorize?client_id=CANASKGOV-TEST&scope=openid%20myinfo.name%20myinfo.nric_number&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A6174%2Fapi%2Fv1%2Fauth%2Fcallback&state=state"
              />
            </Popconfirm>
            {/* margin: vertical | horizontal */}
            {/*<AutoComplete*/}
            {/*  style={{ width: 300, float: 'right', margin: '16px 10px' }}*/}
            {/*>*/}
            {/*  <Input.Search placeholder="Search AskGov" />*/}
            {/*</AutoComplete>*/}
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Alert
          message="Note"
          description="Note: This website is in a testing state. Send us feedback at <askgov@open.gov.sg>"
          type="warning"
          closable
          showIcon
          // action={
          //   <Button size="small" href={feedbackUrl} type="ghost">
          //     Feedback
          //   </Button>
          // }
          style={{ margin: '15px 0' }}
        />
        <LoginPrompt
          visible={isLoginPromptVisible}
          setVisible={setIsLoginPromptVisible}
          url={url}
        />
        <Outlet
          context={{
            checkLogin,
            currentUser: userQueryResult.data?.currentUser ?? undefined,
            currentOfficer: userQueryResult.data?.currentOfficer ?? undefined,
          }}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © 2022 Open Government Products, Government Technology Agency Singapore
        <br />
        <Link to={`${routes.privacyStatement}?${globalSearchParams}`}>
          Privacy Statement
        </Link>
        <Divider type="vertical" />
        <Link to={`${routes.termsOfUse}?${globalSearchParams}`}>
          Terms of Use
        </Link>
        <Divider type="vertical" />
        <a href={feedbackUrl}>Feedback</a>
      </Footer>
    </Layout>
  )
}

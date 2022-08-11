import React, { FC, Dispatch, SetStateAction } from 'react'
import { Modal, notification } from 'antd'

interface LoginPromptProps {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  url?: string
}

export const LoginPrompt: FC<LoginPromptProps> = (props: LoginPromptProps) => {
  const handleOk = () => {
    if (props.url) {
      window.location.replace(props.url)
    } else {
      notification.error({ message: 'Sign in not available' })
    }
    props.setVisible(false)
  }

  const handleCancel = () => {
    props.setVisible(false)
  }

  return (
    <Modal
      title="Sign In"
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Sign in"
    >
      <p>You must sign in to do that.</p>
    </Modal>
  )
}

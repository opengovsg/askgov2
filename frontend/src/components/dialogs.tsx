import React, { FC, Dispatch, SetStateAction } from 'react'
import { Modal, notification } from 'antd'
import { Question, User } from '../data'

export function checkNonAuthorLike(user?: User, question?: Question) {
  if (user && question && user.id === question.authorId) {
    Modal.info({
      content: "You can't vote on your own questions.",
    })
    return false
  }
  return true
}

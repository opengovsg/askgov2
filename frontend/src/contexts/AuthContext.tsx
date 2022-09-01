import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { User, Officer, WhoamiResult } from '../data'

import {
  getWhoami,
  useLoginUrlQuery,
  useLogoutMutation,
  useOtpVerifyMutation,
  useWhoamiQuery,
} from '../api'
import { useNavigate } from 'react-router-dom'
import { useStyledToast } from '../components/StyledToast/StyledToast'
import { asErr } from '../util'

interface AuthContextProps {
  currentUser: User | null
  currentOfficer: Officer | null
  verifyOtp: UseMutationResult<
    unknown,
    unknown,
    { email: string; token: string }
  >
  logout: () => void
}

const authContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = (): AuthContextProps => {
  const auth = useContext(authContext)
  if (!auth) throw new Error('useAuth must be used within an AuthProvider')
  return auth
}

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const toast = useStyledToast()
  const userQueryResult = useWhoamiQuery()
  // const navigate = useNavigate()
  // const { data } = useLoginUrlQuery(userQueryResult.data)
  // const url = data?.url
  const verifyOtp = useOtpVerifyMutation()
  const logoutMutation = useLogoutMutation(undefined, (error) => {
    toast({
      status: 'error',
      description: asErr(error).message,
    })
  })
  const logout = () => {
    logoutMutation.mutate()
  }
  // const login = () => {
  //   if (url) window.location.replace(url)
  // }

  const auth: AuthContextProps = {
    currentUser: userQueryResult.data?.currentUser ?? null,
    currentOfficer: userQueryResult.data?.currentOfficer ?? null,
    verifyOtp,
    logout,
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

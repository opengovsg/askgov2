import { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { Alert, Button, Spin } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { queryKey, routes } from '../constants'

function useAuthMutation(onSuccess: () => void) {
  return useMutation(
    [`authCallback`],
    (queryParams: { code?: string; state?: string }) => {
      return api
        .url('/auth/callback')
        .query(queryParams)
        .get()
        .json<{ userId: number | undefined }>()
    },
    {
      onSuccess,
    },
  )
}

export const AuthCallback = (): JSX.Element => {
  let [searchParams, _setSearchParams] = useSearchParams()
  const code = searchParams.get('code') ?? undefined
  const state = searchParams.get('state') ?? undefined
  const returnTo = state ?? '/'
  console.log()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const onAuthMutationSuccess = () => {
    queryClient.invalidateQueries(queryKey.whoami)
    navigate(returnTo, { replace: true })
  }
  const authMutation = useAuthMutation(onAuthMutationSuccess)

  // The Ref is required because we want to send the auth call exactly once.
  // Passing [] as dependencies argument to useEffect used to ensure this, but no longer.
  // See: https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
  const authMutationSent = useRef(false)
  useEffect(() => {
    if (!authMutationSent.current) {
      authMutationSent.current = true
      authMutation.mutate({ code, state })
    }
  }, [])

  return authMutation.isError ? (
    <Alert
      message="Login Error"
      showIcon
      description={
        typeof authMutation.error === 'object' &&
        authMutation.error instanceof Error
          ? authMutation.error.message
          : 'Unknown Error'
      }
      type="error"
      action={
        <Button
          size="small"
          danger
          onClick={() => {
            navigate(returnTo)
          }}
        >
          Return Home
        </Button>
      }
    />
  ) : (
    <Spin size="large" />
  )
}

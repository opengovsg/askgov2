import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  Answer,
  Like,
  Officer,
  Question,
  ScreenState,
  User,
  UserLikeData,
} from '../data'
import {
  api,
  getApprovedQuestions,
  getQuestions,
  getTags,
  postAnswer,
  postQuestions,
  patchScreenState,
} from './api'
import { notification } from 'antd'
import { asErr } from '../util'
import { queryKey } from '../constants'
import { useLocation } from 'react-router-dom'

export function useLoginUrlQuery(data?: { currentUser: User | null }) {
  const location = useLocation()
  const returnTo = `${location.pathname}${location.search}${location.hash}`
  return useQuery(
    ['login_url'],
    () =>
      api.url(`/auth/url`).query({ returnTo }).get().json<{ url: string }>(),
    { enabled: data && data.currentUser === null },
  )
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout').post().text(), {
    onError: (error) => {
      notification.error({
        message: 'Could no sign out!',
        description: JSON.stringify(error),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.whoami)
    },
  })
}

export function useLogoutUserMutation() {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout/user').post().text(), {
    onError: (error) => {
      notification.error({
        message: 'Could no sign out!',
        description: JSON.stringify(error),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.whoami)
    },
  })
}

export function useLogoutOfficerMutation() {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout/officer').post().text(), {
    onError: (error) => {
      notification.error({
        message: 'Could no sign out!',
        description: JSON.stringify(error),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.whoami)
    },
  })
}

export function useWhoamiQuery() {
  return useQuery(queryKey.whoami, () =>
    api
      .url(`/auth/whoami`)
      .get()
      .json<{ currentUser: User | null; currentOfficer: Officer | null }>(),
  )
}

export function useAskMutation(tags: string[]) {
  return useMutation(
    (newQuestion: string) => postQuestions(newQuestion, tags),
    {
      onError: (error, variables, context) => {
        const err = asErr(error)
        notification.error({
          message: 'Could not submit question',
          description: `${err.message}`,
        })
      },
      // onSuccess: (data, variables, context) => {
      //   notification.success({
      //     message: 'Question Submitted',
      //   })
      // },
    },
  )
}

export function useAnswerMutation(
  invalidQueryKey: QueryKey,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { questionId: number; body: string }) => postAnswer(params),
    {
      onError: (error, variables, context) => {
        const err = asErr(error)
        notification.error({
          message: 'Could not submit answer',
          description: `${err.message}`,
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries(invalidQueryKey)
        onSuccess && onSuccess()
      },
    },
  )
}

export function usePatchScreenStateMutation(
  invalidQueryKey: QueryKey,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { questionId: number; screenState: ScreenState }) =>
      patchScreenState(params.questionId, params.screenState),
    {
      onError: (error, variables, context) => {
        const err = asErr(error)
        notification.error({
          message: 'Could not change screen state',
          description: `${err.message}`,
        })
        queryClient.invalidateQueries(invalidQueryKey)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(invalidQueryKey)
        onSuccess && onSuccess()
      },
    },
  )
}

export function useQuestionsQuery(
  queryKey: QueryKey,
  tags: string[],
  screenState: ScreenState,
) {
  return useQuery(queryKey, () => getQuestions(tags, screenState))
}

export function useApprovedQuestionsQuery(queryKey: QueryKey, tags: string[]) {
  return useQuery(queryKey, () => getApprovedQuestions(tags))
}

export function useQuestionQuery(queryKey: QueryKey, id?: string) {
  return useQuery(queryKey, () =>
    api.url(`/question/${id}`).get().json<Question>(),
  )
}

export function useTagsQuery(queryKey: QueryKey, tags: string[]) {
  return useQuery(queryKey, () => getTags(tags), {
    enabled: tags.length > 0,
  })
}

export type UpdateLikesFn = (
  queryClient: QueryClient,
  data: UserLikeData,
  variables: { like: Like; id: number },
) => void

export enum LikeType {
  QUESTION = 'question',
  ANSWER = 'answer',
}

export function useLikeMutation(
  likeType: LikeType,
  updateLikesFn: UpdateLikesFn,
) {
  const queryClient = useQueryClient()
  const updateLikes = updateLikesFn.bind(null, queryClient)
  return useMutation(
    (params: { id: number; like: Like }) => {
      const { id, like } = params
      if (like === Like.UP) {
        return api.url(`/like/${likeType}/${id}/up`).post().json<UserLikeData>()
      } else {
        return api
          .url(`/like/${likeType}/${id}/down`)
          .post()
          .json<UserLikeData>()
      }
    },
    {
      onError: (error, variables, context) => {
        const e = asErr(error)
        notification.error({
          message: 'Could not perform Like operation',
          description: `${e.name}: ${e.message}`,
          // duration: 0,
        })
      },
      onSuccess: updateLikes,
    },
  )
}

function mergeQuestionLikes(q: Question, data: UserLikeData) {
  const newQ: Question = { ...q, ...data }
  if (q._count.answers) {
    newQ._count.answers = q._count.answers
  }
  return newQ
}

export function questionListQueryUpdateQuestionLikesFn(
  invalidQueryKey: QueryKey,
) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const questions = queryClient.getQueryData<Question[]>(invalidQueryKey)
    if (questions) {
      queryClient.setQueryData(
        invalidQueryKey,
        questions.map((q: Question) => {
          if (q.id !== variables.id) {
            return q
          } else {
            return mergeQuestionLikes(q, data)
          }
        }),
      )
    }
  }
}

export function questionQueryUpdateQuestionLikesFn(invalidQueryKey: QueryKey) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const question = queryClient.getQueryData<Question>(invalidQueryKey)
    if (question) {
      queryClient.setQueryData(
        invalidQueryKey,
        mergeQuestionLikes(question, data),
      )
    }
  }
}

export function questionQueryUpdateAnswerLikesFn(invalidQueryKey: QueryKey) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const question = queryClient.getQueryData<Question>(invalidQueryKey)
    if (question) {
      queryClient.setQueryData(invalidQueryKey, {
        ...question,
        answers: question.answers?.map((a: Answer) => {
          if (a.id !== variables.id) {
            return a
          } else {
            return { ...a, ...data }
          }
        }),
      })
    }
  }
}

export function useOtpGenerateMutation(onSuccess?: () => void) {
  return useMutation(
    (params: { email: string }) => {
      const { email } = params
      return api.url(`/auth/otp/generate`).post(params).text()
    },
    {
      onError: (error, variables, context) => {
        const e = asErr(error)
        notification.error({
          message: 'Could not request one-time password',
          description: `${e.name}: ${e.message}`,
          // duration: 0,
        })
      },
      onSuccess: onSuccess,
    },
  )
}

export function useOtpVerifyMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { email: string; token: string }) => {
      const { email } = params
      return api.url(`/auth/otp/verify`).post(params).text()
    },
    {
      onError: (error, variables, context) => {
        const e = asErr(error)
        notification.error({
          message: 'Verification Failed.',
          description: `Could not verify one-time password. Please try again.`,
          // duration: 0,
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.whoami)
        onSuccess && onSuccess()
      },
    },
  )
}

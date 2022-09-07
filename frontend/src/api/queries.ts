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
  WhoamiResult,
} from '../data'
import {
  api,
  getApprovedQuestions,
  getApprovedQuestionsPage,
  getApprovedQuestionsCount,
  getQuestions,
  getTags,
  postAnswer,
  postQuestions,
  patchScreenState,
  getWhoami,
} from './api'
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

export function useLogoutMutation(
  onSuccess?: (data: string) => void,
  onError?: (error: unknown) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout').post().text(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.whoami)
      onSuccess && onSuccess(data)
    },
    onError: onError,
  })
}

export function useLogoutUserMutation(
  onSuccess?: (data: string) => void,
  onError?: (error: unknown) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout/user').post().text(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.whoami)
      onSuccess && onSuccess(data)
    },
    onError: onError,
  })
}

export function useLogoutOfficerMutation(
  onSuccess?: (data: string) => void,
  onError?: (error: unknown) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(() => api.url('/auth/logout/officer').post().text(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.whoami)
      onSuccess && onSuccess(data)
    },
    onError: onError,
  })
}

export function useWhoamiQuery() {
  return useQuery(queryKey.whoami, () => getWhoami())
}

export function useAskMutation(
  tags: string[],
  onSuccess?: (data: Question, variables: string) => void,
  onError?: (error: unknown, variables: string) => void,
) {
  return useMutation(
    (newQuestion: string) => postQuestions(newQuestion, tags),
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  )
}

export function useAnswerMutation(
  invalidQueryKey: QueryKey,
  onSuccess?: (
    data: Answer,
    variables: { questionId: number; body: string },
  ) => void,
  onError?: (
    error: unknown,
    variables: { questionId: number; body: string },
  ) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { questionId: number; body: string }) => postAnswer(params),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(invalidQueryKey)
        onSuccess && onSuccess(data, variables)
      },
      onError: onError,
    },
  )
}

export function usePatchScreenStateMutation(
  invalidQueryKey: QueryKey,
  onSuccess?: (
    data: Question,
    varibles: { questionId: number; screenState: ScreenState },
  ) => void,
  onError?: (
    error: unknown,
    varibles: { questionId: number; screenState: ScreenState },
  ) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { questionId: number; screenState: ScreenState }) =>
      patchScreenState(params.questionId, params.screenState),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(invalidQueryKey)
        onSuccess && onSuccess(data, variables)
      },
      onError: (error, variables) => {
        queryClient.invalidateQueries(invalidQueryKey)
        onError && onError(error, variables)
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

export function useApprovedQuestionsPageQuery(
  queryKey: QueryKey,
  page: number,
  questionsPerPage: number,
  tags: string[],
) {
  return useQuery(
    queryKey,
    () => getApprovedQuestionsPage(page, questionsPerPage, tags),
    {
      keepPreviousData: true,
    },
  )
}

export function useApprovedQuestionsCountQuery(
  queryKey: QueryKey,
  tags: string[],
) {
  return useQuery(queryKey, () => getApprovedQuestionsCount(tags), {
    keepPreviousData: true,
  })
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
  onError?: (error: unknown, variables: { id: number; like: Like }) => void,
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
      onSuccess: updateLikes,
      onError: onError,
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

export function useOtpGenerateMutation(
  onSuccess?: (data: string, variables: { email: string }) => void,
  onError?: (error: unknown, variables: { email: string }) => void,
) {
  return useMutation(
    (params: { email: string }) => {
      const { email } = params
      return api.url(`/auth/otp/generate`).post(params).text()
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  )
}

export function useOtpVerifyMutation(
  onSuccess?: (
    data: string,
    variables: { email: string; token: string },
  ) => void,
  onError?: (
    error: unknown,
    variables: { email: string; token: string },
  ) => void,
) {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { email: string; token: string }) => {
      return api.url(`/auth/otp/verify`).post(params).text()
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(queryKey.whoami)
        onSuccess && onSuccess(data, variables)
      },
      onError: onError,
    },
  )
}

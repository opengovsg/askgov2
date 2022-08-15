import { SearchParam } from '../constants'
import { useSearchParams } from 'react-router-dom'

export function globalSearchParams(searchParams: URLSearchParams) {
  const newParams = new URLSearchParams()

  const tags = searchParams.getAll(SearchParam.tag)
  for (const tag of tags) {
    newParams.append(SearchParam.tag, tag)
  }

  return newParams
}

export function useGlobalSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  return globalSearchParams(searchParams)
}

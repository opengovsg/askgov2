import { SearchParam, routes } from '../constants'
import { useSearchParams, generatePath } from 'react-router-dom'

function globalSearchParams(searchParams: URLSearchParams) {
  const newParams = new URLSearchParams()

  const tags = searchParams.getAll(SearchParam.tag)
  for (const tag of tags) {
    newParams.append(SearchParam.tag, tag)
  }

  return newParams
}

function useGlobalSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  return globalSearchParams(searchParams)
}

export function useAntPathGenerator() {
  const globalSearchParams = useGlobalSearchParams()
  return new PathGenerator(routes.antbase, globalSearchParams)
}

export function usePathGenerator() {
  const globalSearchParams = useGlobalSearchParams()
  return new PathGenerator(routes.base, globalSearchParams)
}

export function useTags() {
  const [searchParams, setSearchParams] = useSearchParams()
  return searchParams.getAll(SearchParam.tag)
}

export class PathGenerator {
  private hasSearchParams: boolean
  constructor(private base: string, private searchParams: URLSearchParams) {
    this.hasSearchParams = Array.from(this.searchParams).length !== 0
  }
  get(path?: string, params?: { [p: string]: string | undefined }) {
    const baseStr = this.base + (this.base !== '/' && path ? '/' : '')
    const pathStr = path ? generatePath(path, params) : ''
    const searchParamsStr = this.hasSearchParams ? '?' + this.searchParams : ''
    return baseStr + pathStr + searchParamsStr
  }
}

import { UserGuard } from './auth.guard'

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined()
  })
})

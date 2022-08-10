import { Test, TestingModule } from '@nestjs/testing'
import { AnswerUpperService } from './answer-upper.service'

describe('LikeService', () => {
  let service: AnswerUpperService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerUpperService],
    }).compile()

    service = module.get<AnswerUpperService>(AnswerUpperService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

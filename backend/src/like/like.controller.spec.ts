import { Test, TestingModule } from '@nestjs/testing'
import { LikeController } from './like.controller'
import { AnswerUpperService } from './answer-upper.service'

describe('LikeController', () => {
  let controller: LikeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [AnswerUpperService],
    }).compile()

    controller = module.get<LikeController>(LikeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

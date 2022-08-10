export enum Like {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface LikeCounts {
  uppedBy: number
  downedBy: number
}

export interface UserLikeData {
  _count: LikeCounts
  uppedBy: { createdAt: string }[]
  downedBy: { createdAt: string }[]
}

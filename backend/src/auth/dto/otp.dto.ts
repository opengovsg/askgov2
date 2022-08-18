export class GenerateOtpDto {
  email!: string
}

export class VerifyOtpDto extends GenerateOtpDto {
  token!: string
}

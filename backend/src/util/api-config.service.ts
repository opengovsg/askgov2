import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Joi from 'joi'

// Note: convict is a compelling alternative to @nestjs/config
//  + Types and validation are defined in one place (schema file). (Custom getters are still in another service.)
//  + Keeps config in a nice tree structure.
//  - It doesn't load .env, so you must use direnv or 'source .env' to load the environment before running.
//    This doesn't play nice with IDEs like WebStorm.
//  - It requires a default for everything and can't throw errors if something is missing.

// Used in ConfigService.forRoot(), which will load from .env or environment.
// Careful! Types must match those defined in EnvironmentVariables (ugly!!!)
// Consider generating the with joi-to-typescript.

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().uri().required(),
  APP_PORT: Joi.number().default(6174), // The port that this service runs on.
  FRONTEND_URL: Joi.string().uri().required(), // See auth.controller ToDo: can't rely on this default.
  SGID_CLIENT_ID: Joi.string().default('CANASKGOV-TEST'),
  SGID_CLIENT_SECRET: Joi.string().required(),
  SGID_PRIVATE_KEY: Joi.string().required(),
  SGID_REDIRECT_URL: Joi.string().default(
    'http://localhost:3000/auth-callback',
  ),
  SGID_HOSTNAME: Joi.string().default('https://api.id.gov.sg'),
  SESSION_SECRET: Joi.string().required(),
  SESSION_NAME: Joi.string().default('CanAskGovSession'),
  SESSION_MAX_AGE: Joi.number().default(7 * 24 * 60 * 60 * 1000), // ms
  SESSION_CHECK_PERIOD: Joi.number().default(2 * 60 * 1000), // ms
})

interface EnvironmentVariables {
  NODE_ENV: string
  APP_PORT: number
  FRONTEND_URL: string
  SGID_CLIENT_ID: string
  SGID_CLIENT_SECRET: string
  SGID_PRIVATE_KEY: string
  SGID_REDIRECT_URL: string
  SGID_HOSTNAME: string
  SESSION_SECRET: string
  SESSION_NAME: string
  SESSION_MAX_AGE: number
  SESSION_CHECK_PERIOD: number
}

@Injectable()
export class ApiConfigService {
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  // To make Typescript happy in complex cases, `get` may need a type parameter (e.g. configService.get<T>)
  // or an additional `infer` argument (e.g. configService.get('FOO', { infer: true })
  // or both?
  // Types are checked agains the interface above, not agains the Joi schema,
  // so typing is nearly a pointless exercise here, but it does at least warn us
  // if we typed the name of the variable incorrectly.

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production'
  }

  get isStaging(): boolean {
    return this.configService.get('NODE_ENV') === 'staging'
  }

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development'
  }

  get isTest(): boolean {
    return this.configService.get('NODE_ENV') === 'test'
  }

  get appPort(): number {
    return this.configService.get('APP_PORT')
  }

  get frontendUrl(): string {
    return this.configService.get('FRONTEND_URL')
  }

  get sgidClientId(): string {
    return this.configService.get('SGID_CLIENT_ID')
  }

  get sgidClientSecret(): string {
    return this.configService.get('SGID_CLIENT_SECRET')
  }

  get sgidPrivateKey(): string {
    return this.configService.get('SGID_PRIVATE_KEY')
  }

  get sgidRedirectUrl(): string {
    return this.configService.get('SGID_REDIRECT_URL')
  }

  get sgidHostname(): string {
    return this.configService.get('SGID_HOSTNAME')
  }

  get sessionSecret(): string {
    return this.configService.get('SESSION_SECRET')
  }

  get sessionName(): string {
    return this.configService.get('SESSION_NAME')
  }

  get sessionMaxAge(): number {
    return this.configService.get('SESSION_MAX_AGE')
  }

  get sessionCheckPeriod(): number {
    return this.configService.get('SESSION_CHECK_PERIOD')
  }
}

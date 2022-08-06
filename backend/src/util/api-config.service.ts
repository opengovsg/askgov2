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
  APP_PORT: Joi.number().default(6174), // The port that this service runs on.
  SGID_SCOPES: Joi.array()
    .items(Joi.string())
    .default(['openid', 'myinfo.name', 'myinfo.nric_number']),
  SGID_CLIENT_ID: Joi.string().default('CANASKGOV-TEST'),
  SGID_CLIENT_SECRET: Joi.string().required(),
  SGID_PRIVATE_KEY: Joi.string().required(),
  SGID_REDIRECT_HOSTNAME: Joi.string().default('http://localhost:6174'),
  SGID_HOSTNAME: Joi.string().default('https://api.id.gov.sg'),
})

interface EnvironmentVariables {
  APP_PORT: number
  SGID_SCOPES: string[]
  SGID_CLIENT_ID: string
  SGID_CLIENT_SECRET: string
  SGID_PRIVATE_KEY: string
  SGID_REDIRECT_HOSTNAME: string
  SGID_HOSTNAME: string
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

  get appPort(): number {
    return this.configService.get('APP_PORT')
  }

  get sgidScopes(): string[] {
    return this.configService.get('SGID_SCOPES')
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

  get sgidRedirectHostname(): string {
    return this.configService.get('SGID_REDIRECT_HOSTNAME')
  }

  get sgidHostname(): string {
    return this.configService.get('SGID_HOSTNAME')
  }
}

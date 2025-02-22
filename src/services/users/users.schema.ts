// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import crypto from 'crypto'
import { resolve, validateQuery } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './users.class'

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    githubId: Type.Optional(Type.String()),
    avatar: Type.Optional(Type.String())
  },
  { $id: 'User', additionalProperties: false }
)
export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext<UserService>>({})

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const userDataSchema = Type.Pick(userSchema, ['email', 'password', 'githubId', 'avatar'], {
  $id: 'UserData'
})
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
/**
 * Resolves the `password` and `avatar` fields for the user data.
 * Hashes the password using the local strategy and generates a Gravatar URL for the avatar if not provided.
 *
 * @param {string | undefined} value - The current value of the avatar field.
 * @param {User} user - The user object.
 * @returns {Promise<string | undefined>} - The resolved avatar URL or the provided value.
 */
export const userDataResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' }),
  avatar: async (value, user) => {
    if (value !== undefined) {
      return value
    }
    const hash = crypto.createHash('md5').update(user.email.toLocaleLowerCase()).digest('hex')
    return `https://s.gravatar.com/avatar/${hash}?s=60`
  }
})

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
/**
 * Resolves the `password` field for the user patch.
 * Hashes the password using the local strategy before saving.
 *
 * @param {User} user - The user object.
 * @param {HookContext<UserService>} context - The Feathers hook context.
 * @returns {Promise<string>} - The hashed password.
 */
export const userPatchResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'email', 'githubId'])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
/**
 * Resolves the `id` field for the user query.
 * If there is an authenticated user, they are only allowed to see their own data.
 *
 * @param {number} value - The current value of the id field.
 * @param {any} _ - The user object.
 * @param {HookContext<UserService>} context - The Feathers hook context.
 * @returns {Promise<number>} - The resolved id value.
 */
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, _, context) => {
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})

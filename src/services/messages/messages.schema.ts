// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const messageSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    createdAt: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: 'Message', additionalProperties: false }
)
export type Message = Static<typeof messageSchema>
export const messageValidator = getValidator(messageSchema, dataValidator)

/**
 * Resolves the `user` field in the message schema by fetching the user data
 * based on the `userId` field.
 *
 * @param {Object} message - The message object containing the userId.
 * @param {HookContext} context - The Feathers hook context.
 * @returns {Promise<Object|undefined>} - The user object if found, otherwise undefined.
 */
export const messageResolver = resolve<Message, HookContext>({
  user: virtual(async (message, context) => {
    if (message.userId) {
      return context.app.service('users').get(message.userId)
    }
  })
})

export const messageExternalResolver = resolve<Message, HookContext>({})

// Schema for creating new entries
export const messageDataSchema = Type.Pick(messageSchema, ['text'], {
  $id: 'MessageData'
})
export type MessageData = Static<typeof messageDataSchema>
export const messageDataValidator = getValidator(messageDataSchema, dataValidator)
/**
 * Resolves the `userId` and `createdAt` fields for the message data.
 *
 * @param {any} _value - The current value of the field.
 * @param {any} _messages - The message object.
 * @param {HookContext} context - The Feathers hook context.
 * @returns {Promise<number>} - The resolved userId or createdAt value.
 */
export const messageDataResolver = resolve<Message, HookContext>({
  userId: async (_value, _messages, context) => {
    return context.params.user.id
  },
  createdAt: async () => Date.now()
})

// Schema for updating existing entries
export const messagePatchSchema = Type.Partial(messageSchema, {
  $id: 'MessagePatch'
})
export type MessagePatch = Static<typeof messagePatchSchema>
export const messagePatchValidator = getValidator(messagePatchSchema, dataValidator)
export const messagePatchResolver = resolve<Message, HookContext>({})

// Schema for allowed query properties
export const messageQueryProperties = Type.Pick(messageSchema, ['id', 'text', 'createdAt', 'userId'])
export const messageQuerySchema = Type.Intersect(
  [
    querySyntax(messageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MessageQuery = Static<typeof messageQuerySchema>
export const messageQueryValidator = getValidator(messageQuerySchema, queryValidator)
/**
 * Resolves the `userId` field for the message query.
 *
 * @param {number} value - The current value of the userId field.
 * @param {any} _ - The message object.
 * @param {HookContext} context - The Feathers hook context.
 * @returns {Promise<number>} - The resolved userId value.
 */
export const messageQueryResolver = resolve<MessageQuery, HookContext>({
  userId: async (value, _, context) => {
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})

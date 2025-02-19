import type { HookContext, NextFunction } from '../declarations'
import { logger } from '../logger'

export const logRuntime = async (context: HookContext, next: NextFunction) => {
  const startTime = Date.now()
  logger.info(`Calling ${context.method} on ${context.path}`)

  await next()

  const duration = Date.now() - startTime
  logger.info(`Completed ${context.method} on ${context.path} in ${duration}ms`)
}

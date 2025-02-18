// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext, NextFunction } from '../declarations'

export const logRuntime = async (context: HookContext, next: NextFunction) => {
  console.log(`Running hook log-runtime on ${context.path}.${context.method}`)
  await next()
}

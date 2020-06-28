import { FancyError } from './fancyError.js'
import type { ColorOptions } from './fancyError.js'


export interface ArgumentErrorOptions {
  name?: string
  allowedMessage?: string
  received?: any
  colors?: ColorOptions | false | null
}

export class ArgumentError extends FancyError {
  constructor (allowedMessage: string, received?: any, enclosingFunction?)
  constructor (allowedMessage: string, enclosingFunction?)
  constructor (options: ArgumentErrorOptions, enclosingFunction?)
  constructor (...params) {
    // normalizing input
    const options: ArgumentErrorOptions = {
      name: 'ArgumentError',
      allowedMessage: '',
    }
    let enclosingFunction = ArgumentError
    if (typeof params[0] === 'string') options.allowedMessage = params[0]
    if (typeof params[0] === 'object') Object.assign(options, params[0])
    if (typeof params[1] !== 'function') options.received = params[2]
    else enclosingFunction = params[1]
    if (typeof params[2] !== 'function') enclosingFunction = params[2]
    // formatting
    const message = options.allowedMessage + `\n${' '.repeat(8)}recieved: ${options.received}`
    super({name: options.name, message, colors: options.colors }, enclosingFunction)
  }
}

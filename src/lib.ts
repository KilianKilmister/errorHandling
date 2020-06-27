import { FancyError } from './fancyError.js'
import { AssertPredicate, AssertionError } from 'assert'
import type { Options } from './fancyError.js'

export class ParamError extends FancyError {
  constructor (message: string, enclosingFunction?: Function, options?: Options)
  constructor (message: string, options?: Options, enclosingFunction?: Function)
  constructor (message = '', param1?: Function | Options, param2?: Function | Options) {
    let wrapper; let options
    switch (true) {
      case typeof param1 === 'function':
        wrapper = param1
        if (typeof param2 === 'object') options = param2
        break
      case typeof param2 === 'function':
        wrapper = param2
        if (typeof param1 !== 'object') throw new ParamError('Expected')
        break
    }
    super({
      name: 'PramError',
      message: `Invalid Options: ${message.replace(/^\w/, message[0].toUpperCase()).replace(/[^.]$/, message.charAt(-1) + '.')}`
    }, wrapper)
  }
}

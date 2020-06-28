
import * as util from 'util'
import kleur from 'kleur'

export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'reset'

export interface ColorOptions {
  name?: Color
  message?: Color
  file?: Color
}

export interface ErrorOptions {
  name?: string
  message?: string
  colors?: ColorOptions | false | null
}

export class FancyError extends Error {
  colors: ColorOptions = { name: 'red', message: 'yellow', file: 'cyan' }
  name = 'Error'

  constructor (options: ErrorOptions, enclosingFunction?: Function)
  constructor (message: string, enclosingFunction?: Function)
  constructor (options: ErrorOptions | string, enclosingFunction?) {
    super()
    if (typeof options === 'object'){
      if (options.colors === false || options.colors === null) {
        this.colors.name = this.colors.message = this.colors.file = 'reset'
      } else Object.assign(this.colors, options.colors)
    }
    this.message = typeof options === 'string' ? options : options.message
    this.name = (options as ErrorOptions).name || this.name
    Error.captureStackTrace(this, enclosingFunction || FancyError)
    return this
  }

  [util.inspect.custom] () {
    this.name = kleur[this.colors.name](this.name)
    this.message = kleur[this.colors.message](this.message)
    const lineNum = Array.from(this.name + this.message).filter(char => char === '\n').length + 1
    this.stack = kleur.dim(this.stack.replace(new RegExp(`(.*\n?){${lineNum}}`), '').replace(/file:\/{3}\S+/g, kleur[this.colors.file]))
    return this
  }
}

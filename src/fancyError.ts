
import * as util from 'util'
import kleur from 'kleur'

export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'reset'

export interface ColorOptions {
  name?: Color
  message?: Color
  file?: Color
}

export interface Options {
  name?: string
  message?: string
  colors?: ColorOptions | false
}

export class FancyError extends Error {
  colors: ColorOptions = { name: 'red', message: 'yellow', file: 'cyan' }
  name = 'Error'

  constructor (options: Options, enclosingFunction?: Function)
  constructor (message: string, enclosingFunction?: Function)
  constructor (options: Options | string, enclosingFunction?) {
    super()
    if (typeof options === 'object'){
      if (options.colors === false) {
        this.colors.name = this.colors.message = this.colors.file = 'reset'
      } else Object.assign(this.colors, options.colors)
    }
    this.message = typeof options === 'string' ? options : options.message
    this.name = (options as Options).name || this.name
    Error.captureStackTrace(this, enclosingFunction || FancyError)
    return this
  }

  [util.inspect.custom] () {
    const name = kleur[this.colors.name](this.name)
    const message = kleur[this.colors.message](this.message)
    const stack = kleur.dim(this.stack.substr(this.stack.indexOf('\n') + 1)
      .replace(/file:\/{3}\S+/g, kleur[this.colors.file]))

    return [
      `${name}: ${message}`,
      stack
    ].join('\n')
  }
}

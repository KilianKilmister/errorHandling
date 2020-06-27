
class ErrRef extends Error {
  constructor (key, context) {
    if (excludedStackFn === undefined) {
      super()
    } else {
      const limit = Error.stackTraceLimit
      Error.stackTraceLimit = 0
      super()
      // Reset the limit and setting the name property.
      Error.stackTraceLimit = limit
    }
    const prefix = getMessage(key, [], this)
    let message = `${prefix}: ${context.syscall} returned ` +
                  `${context.code} (${context.message})`

    if (context.path !== undefined) message += ` ${context.path}`
    if (context.dest !== undefined) message += ` => ${context.dest}`

    Object.defineProperties(this, {
      message: {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      info: {
        value: context,
        enumerable: true,
        configurable: true,
        writable: false
      },
      errno: {
        get  () {
          return context.errno
        },
        set: (value) => {
          context.errno = value
        },
        enumerable: true,
        configurable: true
      },
      path: {
        get  () {
          return context.path != null
            ? context.path.toString() : context.pah
        },
        set: (value) => {
          context.path = value
            ? lazyBuffer().from(value.toString()) : undefined
        },
        enumerable: true,
        configurable: true
      },
      dest: {
        get  () {
          return context.dest != null
            ? context.dest.toString() : context.det
        },
        set: (value) => {
          context.dest = value
            ? lazyBuffer().from(value.toString()) : undefined
        },
        enumerable: true,
        configurable: true
      }
    })

    this.code = key
  }

  toString () {
    return `${this.name} [${this.code}]: ${this.message}`
  }

  [Symbol.for('nodejs.util.inspect.custom')] (recurseTimes, ctx) {
    return lazyInternalUtilInspect().inspect(this, {
      ...ctx,
      getters: true,
      customInspect: false
    })
  }
}

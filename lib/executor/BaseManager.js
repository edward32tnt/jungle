class NotImplementedError extends Error {
  constructor() {
    super(...arguments)
  }
}

class BaseManager {
  constructor() {
    this.name = 'baseManager'
  }
  run() {
    throw new NotImplementedError('需要实现 run')
  }
  close() {
    throw new NotImplementedError('需要实现 close')
  }
}

module.exports = BaseManager

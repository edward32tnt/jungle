import NotImplementedError from './NotImplementedError'

class BaseObject {
  constructor() {
    this.name = 'baseObject'
  }
  run() {
    throw new NotImplementedError('run Not Implemented')
  }
  close() {
    throw new NotImplementedError('close Not Implemented')
  }
}

module.exports = BaseObject

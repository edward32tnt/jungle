const debug = require('debug')('jungle:manager.Count')
import BaseManager from './BaseManager'

class Count extends BaseManager{
  run () {
    setInterval(()=>{
      console.log('running')
    }, 1000)
  }
  close() {
  }
}

module.exports = Count

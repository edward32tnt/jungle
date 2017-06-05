const debug = require('debug')('jungle:manager.Count')
import BaseObject from '../util/BaseObject'

class Count extends BaseObject{
  run () {
    setInterval(()=>{
      console.log('running')
    }, 1000)
  }
  close() {
  }
}

module.exports = Count

if (process.env.NODE_ENV === undefined){
  process.env.NODE_ENV = 'development'
}

import cluster from 'cluster'
import path from 'path'
import assert from 'assert'

module.exports = ({childs, name='manager'}) => {
  const debug = require('debug')(`jungle:${name}`)
  if (cluster.isMaster) {
    cluster.setupMaster({
      slient: true,
    })
    childs.forEach((m, i) => {
      cluster.fork()
    })
    cluster.on('exit', (worker, code, signal) => {
      /*
       * Worker close has exception, then restart worker again
      */
      if (code !== 0) {
        cluster.fork()
      }
    })
  } else {
    const Module = childs[cluster.worker.id - 1]
    assert.ok(typeof Module === 'function' || typeof Module === 'object')
    const m = new Module()
    assert.ok(typeof m.run === 'function')
    m.run()
    debug(`worker: ${cluster.worker.id} is running`)
    /*
     * Worker close by user
    */
    process.on('SIGINT', () => {
      assert.ok(typeof m.close === 'function')
      m.close()
      process.exit(0)
    })
  }
}


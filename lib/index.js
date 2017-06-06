if (process.env.NODE_ENV === undefined){
  process.env.NODE_ENV = 'development'
}

import cluster from 'cluster'
import path from 'path'
import assert from 'assert'

module.exports = ({childs, name='manager'}) => {
  const debug = require('debug')(`jungle:${name}`)
  if (cluster.isMaster) {
    const workers = {}
    cluster.setupMaster({
      slient: true,
    })
    childs.forEach((m, i) => {
      const w = cluster.fork({idx: i})
      workers[w.id] = {idx: i}
    })
    cluster.on('exit', (worker, code, signal) => {
      /*
       * Worker close has exception, then restart worker again
      */
      if (code !== 0) {
        const env = workers[worker.id]
        const w2 = cluster.fork(env)
        delete workers[worker.id]
        workers[w2.id] = idx
      }
    })
  } else {
    /*
     * Worker start by env .idx
    */
    const Module = childs[process.env.idx]
    assert.ok(typeof Module === 'function' || typeof Module === 'object')
    const m = new Module()
    assert.ok(typeof m.run === 'function')
    m.run()
    debug(`idx: ${process.env.idx} worker: ${cluster.worker.id} is running`)
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


'use struct'

require('babel-register')({
  presets: ['es2015', 'stage-0'],
})

require('babel-polyfill')

require('./lib')({
  childs: require('./lib/executor'),
  name: 'executor',
})

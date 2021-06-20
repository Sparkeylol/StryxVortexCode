var LRU = require("lru-cache")
  , options = { max: 500
              , maxAge: 1000 * 60 * 60 }
  , cache = new LRU(options)

module.exports = cache
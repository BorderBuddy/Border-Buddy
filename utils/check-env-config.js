const varNotSet = 'NOT_SET'

module.exports = function checkEnv (keys, cb) {
  const keysNotSet = []
  const keysAndValues = []
  keys.forEach((key) => {
    if (process.env[key]) {
      keysAndValues.push({
        [key]: process.env[key]
      })
    } else {
      keysAndValues.push({
        [key]: varNotSet
      })
      keysNotSet.push(key)
    }
  })

  if (cb) {
    cb(keysNotSet, keysAndValues)
  }
}

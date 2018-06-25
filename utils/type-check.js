const isType = (type) => (val) => Object.prototype.toString.call(val) === `[object ${type}]`

const types = ['String', 'Number', 'Boolean', 'Object', 'Null', 'Undefined', 'Function']

export default types.reduce((prev, cur) => {
  prev[`is${cur}`] = isType(cur)
  return prev
}, {})

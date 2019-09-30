export const isJSON = (obj) => {
  const value = JSON.stringify(obj)
  if (!/^\{[\s\S]*\}$/.test(value)) return false
  return true
}

export const stringify = (val) => {
  return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val)
}

export const deserialize = (value) => {
  if (typeof value !== 'string') { return undefined }
  try { return JSON.parse(value) }
  catch (e) { return value }
}

export const isArray = value => Object.prototype.toString.call(value) === "[object Array]"

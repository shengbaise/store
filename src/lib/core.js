class Core {
  constructor (options = {}) {
  }
  isCorrectData (data) {
    if (!data || data+ '' === '[]' || data+ '' === '{}') return false
    const type = Object.prototype.toString.call(data)
    return type === '[object Array]' || type === '[object object]'
  }
}

export default Core

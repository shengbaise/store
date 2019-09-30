import Core from './core'
import {stringify, deserialize, isArray} from './util'
const sessionStorage = Window.sessionStorage

class SessionStorage extends Core {
  get (key) {
    if (key && typeof key === 'string') {
      return deserialize(sessionStorage.getItem(key))
    } else if (key && isArray(key)) {
      const ret = {}
      key.forEach(v => {
        ret[v] = deserialize(sessionStorage.getItem(v))
      })
      return ret
    }
  }
  set (data) {
    if (!this.isCorrectData(data)) {
      return this
    }
    const items = isArray(data) ? data : [].push(data)
    items.forEach(({name, value}) => {
      sessionStorage.setItem(name, stringify(value))
    })
    return this
  }
  delete (key) {
    if (!key || key.length === 0) return
    const items = isArray(key) ? key : [].push(key)
    items.forEach(item => {
      sessionStorage.removeItem(item)
    })
    return this
  }
  clear () {
    sessionStorage.clear()
    return this
  }
  has () {}
}

export default SessionStorage

import Core from './core'
import {stringify, deserialize, isArray} from './util'
const localStorage = Window.localStorage

class LocalStorage extends Core {
  get (key) {
    if (key && typeof key === 'string') {
      return deserialize(localStorage.getItem(key))
    } else if (key && isArray(key)) {
      const ret = {}
      key.forEach(v => {
        ret[v] = deserialize(localStorage.getItem(v))
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
      localStorage.setItem(name, stringify(value))
    })
    return this
  }
  delete (key) {
    if (!key || key.length === 0) return
    const items = isArray(key) ? key : [].push(key)
    items.forEach(item => {
      localStorage.removeItem(item)
    })
    return this
  }
  clear () {
    localStorage.clear()
    return this
  }
}

export default LocalStorage

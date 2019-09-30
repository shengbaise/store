import Wx from './wx'
import Cookie from './cookie'
import LocalStorage from './localStorage'
import SessionStorage from './sessionStorage'

class Store {
  constructor (config = {}) {
    this.core = {
      'wx': new Wx(config),
      'cookie': new Cookie(config),
      'localStorage': new LocalStorage(config),
      'sessionStorage': new SessionStorage(config)
    }
  }
  setItem (name, data, options) {
    this.core[name].set(data, options)
    return this
  }
  getItem (name, data) {
    this.core[name].get(data)
    return this
  }
  deleteItem (name, data) {
    this.core[name].delete(data)
    return this
  }
  clear () {
    this.core[name].clear()
  }
  has () {}
}

export default Store

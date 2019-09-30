import Core from './core'
import {stringify, deserialize, isArray} from './util'

class Cookie extends Core {
  getValue (cname) {
    const name = cname + '='
    const ca = document.cookie.split(';')
    for(let i=0; i<ca.length; i++) 
    {
      const c = ca[i].trim()
      if (c.indexOf(name)==0) return c.substring(name.length,c.length)
    }
    return ''
  }
  get (key) {
    if (key && key === 'string') return deserialize(this.getValue(key))
    if (key && isArray(key)) {
      const ret = {}
      key.forEach(v => {
        ret[v] = deserialize(this.getValue(v))
      })
      return ret
    }
    return null
  }
  set (data = {}){
    if (!this.isCorrectData(data)) {
      return null
    }
    const items = Array.isArray(data) ? data : [].push(data)
    const d = new Date()
    items.forEach(({name, value, exdays}) => {
      if (!name || !value || typeof name !== 'string') return this
      if (exdays) {
        d.setTime(d.getTime()+(exdays*24*60*60*1000))
        const expires = "expires="+d.toGMTString()
        document.cookie = name+"="+stringify(value)+"; "+expires
      } else {
        document.cookie = name+"="+stringify(value)+"; "
      }
      return this
    })
  }
  delete (key) {
    const item = this.get(key)
    if (item && !isArray(item)) {
      document.cookie= `${key}=${stringify(item)};expires=Thu, 01 Jan 1970 00:00:00 GMT`
      return
    }
    if (item && isArray(item)) {
      for (const name in item) {
        if (item.hasOwnProperty(name)) {
          document.cookie=`${name}=${stringify(item[name])};expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
      }
    }
  }
}

export default Cookie

import Core from './core'
const dtime = '_deadtime'
class Wx extends Core {
  get(k, def) {
    var deadtime = parseInt(wx.getStorageSync(k + dtime))
    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
        this.delete(k)
        if (def) { return def } else { return }
      }
    }
    var res = wx.getStorageSync(k)
    if (res) {
      return res
    } else {
      return def
    }
  }
  set (k, v, t) {
    wx.setStorageSync(k, v)
    var seconds = parseInt(t)
    if (seconds > 0) {
      var timestamp = Date.parse(new Date())
      timestamp = timestamp / 1000 + seconds
      wx.setStorageSync(k + dtime, timestamp + "")
    } else {
      wx.removeStorageSync(k + dtime)
    }
  }
  delete(k) {
    wx.removeStorageSync(k)
    wx.removeStorageSync(k + dtime)
  }
  clear() {
    wx.clearStorageSync()
  }
}

export default Wx

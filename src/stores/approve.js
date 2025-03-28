import { makeAutoObservable } from 'mobx'

class Approve {
  // TODO  删除调试数据
  currentInfo = null
  venName = ''

  constructor() {
    makeAutoObservable(this)
  }

  resetCurInfo = (data) => {
    this.currentInfo = { ...data }
  }

  updateCurInfo = (data) => {
    this.currentInfo = { ...this.currentInfo, ...data }
  }

  updateVenName = (data) => {
    this.venName = data
  }
}

const approveStore = new Approve()

export default approveStore

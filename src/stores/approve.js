import { makeAutoObservable } from 'mobx'

class Approve {
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

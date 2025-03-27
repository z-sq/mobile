import { makeAutoObservable } from 'mobx'

class Approve {
  // TODO  删除调试数据
  currentInfo =  {"COM_CODE":"01","ORD_NO":"2024103100010","CUR_CODE":"RMB","CUR_NAME":"人民币","DEP_CODE":"10906","BUY_ID":"null","PUR_PER_CODE":"lhy","PUR_PER_NAME":"李浩宇","GRO_ID":"null","GRO_NAME":"null","REC_VERSION":"1","REC_VERSION_OLD":"null"}
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

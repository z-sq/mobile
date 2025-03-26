import { makeAutoObservable } from 'mobx'

class TabStore{
    currentTabKey='1';
    constructor(){
        makeAutoObservable(this)
    }
    setCurrentTabKey=(key)=>{
        this.currentTabKey=key
    }
}
const tabStore=new TabStore()
export default tabStore
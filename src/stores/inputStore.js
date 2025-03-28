import { makeAutoObservable } from 'mobx'

class InputStore{
    inputTxt=null;
    constructor(){
        makeAutoObservable(this)
    }
    setInputTxt=(key)=>{
        this.inputTxt=key
    }
}
const inputStore=new InputStore()
export default inputStore
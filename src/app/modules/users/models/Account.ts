export interface AccountModel {
  id:number
  role:string,
  username:string,
  balance:number,
  discount:number,
  maxorder:number,
  note:string,
  vip:number,
  rate:number,
  checked?:boolean
}
export interface OrderModelChecked {
  username: string,
  id:number
}

export interface AccountForm {
  username:string,
  balance:number,
  discount:number,
  maxorder:number,
  note:string,
  rate:number,
  vip:number
}

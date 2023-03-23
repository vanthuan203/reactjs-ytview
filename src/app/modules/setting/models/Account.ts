export interface AccountModel {
  id:number
  pricerate:number,
  bonus:number,
  maxorder:number,
  maxordervn:number,
  maxorderus:number,
  checked?:boolean
}
export interface OrderModelChecked {
  id:number
}

export interface AccountForm {
  id:number,
  pricerate:number,
  bonus:number,
  maxorder:number,
  maxordervn:number,
  maxorderus:number,
}

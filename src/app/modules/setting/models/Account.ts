export interface AccountModel {
  id:number
  pricerate:number,
  bonus:number,
  maxorderbuffhus:number,
  maxorderbuffhvn:number,
  maxordervn:number,
  maxorderus:number,
  threadmin:number,
  redirectvn:number,
  redirectus:number,
  checked?:boolean
}

export interface AccountLimitModel {
  id:number
  user:string,
  service:number,
  maxorder:number,
  maxrunning:number,
  countorder:number,
  countdone:number,
  checked?:boolean
}

export interface OrderModelChecked {
  id:number
}

export interface AccountForm {
  id:number,
  pricerate:number,
  bonus:number,
  maxorderbuffhus:number,
  maxorderbuffhvn:number,
  maxordervn:number,
  maxorderus:number,
  threadmin:number,
  redirectvn:number,
  redirectus:number
}

export interface AccountLimitForm {
  id:number
  user:string,
  service:number,
  maxorder:number,
  maxrunning:number,
}

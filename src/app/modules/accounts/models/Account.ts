export interface AccountModel {
  id:number
  vps:string,
  vpsoption:string,
  namevps:string,
  ipv4:string,
  state:number,
  threads:number,
  timecheck:number,
  vpsreset:number,
  acccount:number,
  checked?:boolean
  total:number,
  view24h:number,
  timegettask:string,
  get_account:number
  ext:number,
  cmt:number,
  proxy:number
}
export interface OrderModelChecked {
  vps: string,
  id:number
}

export interface AccountForm {
  vps:string,
  vpsoption:string,
  threads:number,
  vpsreset:number,
  get_account:number,
  ext:number
  cmt:number,
  proxy:number
}

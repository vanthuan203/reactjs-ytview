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
  total_device:number,
  view24h:number,
  timegettask:number,
  get_account:number
  ext:number,
  live:number,
  follower:number,
  acccountlive:number,
  cmt:number,
  proxy:number,
  running:number
}
export interface DeviceModel {
  id:number
  device_id:string,
  device_name:string
  vps:string,
  state:number,
  timecheck:number,
  timegettask:number,
  acccount:number,
  acccountlive:number,
  running:number,
  time_add:number,
  follower:number,
  checked?:boolean
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
  running:number,
  state:number,
  live:number,
  get_account:number,
  ext:number
  proxy:number
}

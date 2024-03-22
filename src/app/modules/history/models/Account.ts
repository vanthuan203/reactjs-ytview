export interface HistoryModel {
 date:string,
  viewsub:number,
  view:number,
  maxsubview:number,
  maxview:number,
  count_view:number,
  count_viewsub:number,
  count_order:number
}
export interface ComputerModel {
  vps: string,
  total: number,
  time: number
}

export interface ProxyModel {
  ipv4: string,
  totalport: number,
  timecheck: number,
  state:number,
  geo:string,
  numcheck:number,
  typeproxy:string
  checked?:boolean
}

export interface AuthenModel {
  ipv4: string,
  timecheck: number,
  lockmode:number,
  checked?:boolean
}

export interface SockModel {
  ip:string,
  ipv4: string,
  ipv4_old:string,
  timeupdate: number,
  auth:string,
  checked?:boolean
}

export interface ChannelStaticModel {
  channel_title: string,
  total: number,
  max_threads: number,
  channel_id:string
}
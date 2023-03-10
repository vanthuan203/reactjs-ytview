export interface HistoryModel {
 date:string,time:number,view:number,maxtime:number,maxview:number
}
export interface ComputerModel {
  vps: string,
  total: number,
  time: string
}

export interface ProxyModel {
  ipv4: string,
  totalport: number,
  timecheck: number,
  state:number,
  geo:string,
  checked?:boolean
}

export interface ChannelStaticModel {
  channel_title: string,
  total: number,
  max_threads: number,
  channel_id:string
}
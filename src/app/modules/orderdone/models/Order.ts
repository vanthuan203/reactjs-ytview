export interface OrderModel {
  orderid:number,
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  insertdate: number,
  timestart:number,
  enddate: number,
  note: string,
  view24h:number,
  viewtotal:number,
  duration:number,
  user:string,
  price:number,
  service:number,
  vieworder:number,
  geo:string,
  checked?:boolean
}

export interface OrderModelChecked {
  videoid: string,
  id:number
}

export interface OrderUpdateForm {
  orderid:number,
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  insertdate: number,
  enddate: number,
  note: string,
  view24h:number,
  viewtotal:number,
  service:number,
  vieworder:number,
  user:string
}

export interface OrderForm {
  videoid:string,
  note: string,
  maxthreads: number,
  viewstart:number,
  timebuff:number,
  service:number,
  vieworder:number,
  user:string
}
export interface OrderFormManual {
  orderid:number,
  videoid:string,
  homerate: number,
  note: string,
  directrate: number,
  //view_need: number,
  //list_video:string,
  commentrate: number,
  mobilerate: number,
  searchrate: number,
  enabled: number,
  maxthreads: number,
  viewstart:number,
  //group_id: number,
  likerate: number,
  //comment_list: string,
  suggestrate: number,
  //premium_rate: number,
  //keyword: string
  timebuff:number,
  optionbuff:number,
  service:number,
  vieworder:number,
  user:string
}

export interface OrderPost {
  channel_id: string
  subscribe_need: number
  tab_run: number
  note: string
  group_id: number
}


export interface Group {
  id: number
  insert_date: number
  insert_dateString: string
  name: number
  number_channel: number
}
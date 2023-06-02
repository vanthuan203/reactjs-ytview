export interface OrderModel {
  orderid:number,
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  commentstart:number,
  commentend:number,
  insertdate: number,
  enddate: number,
  note: string,
  commenttotal:number,
  duration:number,
  user:string,
  price:number,
  service:number,
  commentorder:number,
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
  commentstart:number,
  commentend:number,
  insertdate: number,
  enddate: number,
  note: string,
  commenttotal:number,
  service:number,
  commentorder:number,
  user:string
}

export interface OrderForm {
  videoid:string,
  note: string,
  maxthreads: number,
  commentstart:number,
  timebuff:number,
  service:number,
  commentorder:number,
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
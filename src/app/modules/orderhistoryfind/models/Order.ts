export interface OrderModel {
  vieworder:number,
  service:number,
  orderid:number,
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  enabled: number,
  insertdate: number,
  timestart:number,
  timecheckbh:number,
  enddate: number,
  cancel:number,
  homerate: number ,
  note: string,
  directrate:number,
  timebuff:number,
  timebuffh24h:number,
  view24h:number,
  viewtotal:number,
  timebuffhtotal: number,
  commentrate:number,
  mobilerate:number,
  searchrate:number,
  likerate:number,
  suggestrate:number,
  duration:number,
  optionbuff:number,
  user:string,
  price:number,
  status:string
  info:string,
  checked?:boolean
}

export interface OrderModelFollower {
  orderid:number,
  tiktok_id:string,
  price:number,
  follower_order:number,
  follower_start:number,
  follower_total:number,
  follower_end:number,
  insert_date:number,
  end_date:number,
  cancel:number,
  service:number
  note:string,
  user:string,
  time_check_refill:number,
  time_start:number
  status:string
  info:string,
  checked?:boolean
}


export interface OrderModelCmt {
  vieworder:number,
  service:number,
  orderid:number,
  videoid: string,
  videotitle: string,
  commenttotal: number,
  commentstart:number,
  commentorder:number,
  commentend:number,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  enabled: number,
  insertdate: number,
  timestart:number,
  timecheckbh:number,
  enddate: number,
  cancel:number,
  homerate: number ,
  note: string,
  directrate:number,
  timebuff:number,
  timebuffh24h:number,
  view24h:number,
  viewtotal:number,
  timebuffhtotal: number,
  commentrate:number,
  mobilerate:number,
  searchrate:number,
  likerate:number,
  suggestrate:number,
  duration:number,
  optionbuff:number,
  user:string,
  price:number,
  status:string,
  checked?:boolean
}
export interface OrderModelChecked {
  videoid: string,
  id:number,
  timebuff:number,
  viewstart:number,
  viewend:number,
  insertdate: string,
  enddate: string,
  cancel:number,
  viewtotal:number,
  timebuffhtotal: number,
  user:string,
  note:string,
}

export interface OrderUpdateForm {
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  enabled: number,
  insertdate: number,
  enddate: number,
  homerate: number ,
  note: string,
  directrate:number,
  timebuff:number,
  timebuffh24h:number,
  view24h:number,
  viewtotal:number,
  timebuffhtotal: number,
  commentrate:number,
  mobilerate:number,
  searchrate:number,
  likerate:number,
  suggestrate:number,
  optionbuff:number,
  user:string
}

export interface OrderForm {
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
  user:string
}
export interface OrderFormManual {
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
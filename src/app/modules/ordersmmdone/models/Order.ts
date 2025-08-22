export interface OrderModel {
  order_id:number,
  order_key: string,
  order_link: string,
  total_thread: number,
  thread: number,
  insert_time: number,
  start_time: number,
  update_time: number,
  start_count: number,
  total: number,
  quantity: number,
  check_count: number,
  current_count: number,
  service_id: number,
  charge: number,
  note: string,
  username: string,
  task: string,
  platform: string,
  mode: string,
  bonus:number,
  bonus_check:number,
  total_check: number,
  priority:number,
  update_current_time:number
  
  checked?:boolean
}

export interface OrderModelChecked {
  order_id: number,
  id:number
}

export interface OrderUpdateForm {
  order_key:string,
  thread: number,
  note: string,
  priority:number,
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
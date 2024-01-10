export interface OrderModel {
  orderid:number,
  link: string,
  keywords: string,
  total: number,
  maxthreads: number,
  insertdate: number,
  timestart:number,
  enddate: number,
  note: string,
  traffic24h:number,
  traffictotal:number,
  duration:number,
  user:string,
  price:number,
  service:number,
  package:number,
  trafficorder:number,
  checked?:boolean
}

export interface OrderModelChecked {
  orderid: number,
  id:number
}

export interface OrderUpdateForm {
  orderid:number,
  link:string,
  keywords: string,
  total: number,
  maxthreads: number,
  insertdate: number,
  enddate: number,
  note: string,
  traffic24h:number,
  traffictotal:number,
  service:number,
  trafficorder:number,
  user:string
}

export interface OrderForm {
  orderid:number,
  note: string,
  link:string,
  maxthreads: number,
  service:number,
  trafficorder:number,
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
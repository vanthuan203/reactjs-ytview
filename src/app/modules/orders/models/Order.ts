export interface OrderModel {
  channel_title: string,
  total: number,
  max_threads: number,
  channel_id:string,
  view_percent:number,
  enabled: number,
  insert_date: number,
  home_rate: number ,
  note: string,
  direct_rate:number,
  view_need:number,
  view_total:number,
  comment_rate:number,
  mobile_rate:number,
  search_rate:number,
  list_video:string,
  max_thread:number,
  group_id:number,
  like_rate:number,
  comment_list:string,
  suggest_rate:number,
  premium_rate:number,
  keyword:string,
  checked?:boolean
}

export interface OrderUpdateForm {
  channel_id:string,
  home_rate: number,
  //note: string,
  direct_rate: number,
  //view_need: number,
  //list_video:string,
  //comment_rate: number,
  //mobile_rate: number,
  search_rate: number,
  enabled: number,
  max_thread: number,
  view_percent:number,
  //group_id: number,
  //like_rate: number,
  //comment_list: string,
  suggest_rate: number,
  //premium_rate: number,
  //keyword: string
}

export interface OrderForm {
  channel_id:string,
  home_rate: number,
  //note: string,
  direct_rate: number,
  //view_need: number,
  //comment_rate: number,
  //mobile_rate: number,
  search_rate: number,
  enabled: number,
  max_thread: number,
  view_percent:number,
  //group_id: number,
  //like_rate: number,
  //comment_list: string,
  suggest_rate: number,
  //premium_rate: number,
  //keyword: string
}
export interface OrderFormManual {
  channel_id:string,
  list_video:string,
  home_rate: number,
  //note: string,
  direct_rate: number,
  //view_need: number,
  //comment_rate: number,
  //mobile_rate: number,
  search_rate: number,
  enabled: number,
  max_thread: number,
  view_percent:number,
  //group_id: number,
  //like_rate: number,
  //comment_list: string,
  suggest_rate: number,
  //premium_rate: number,
  //keyword: string
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
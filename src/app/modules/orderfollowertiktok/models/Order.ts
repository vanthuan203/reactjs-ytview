export interface OrderModel {
  orderid:number,
  tiktok_id: string,
  total: number,
  max_threads: number,
  insert_date: number,
  time_start:number,
  note: string,
  follower_start:number,
  follower_total:number,
  duration:number,
  user:string,
  price:number,
  service:number,
  follower_order:number,
  checked?:boolean
}

export interface OrderModelChecked {
  tiktok_id: string,
  id:number
}

export interface OrderUpdateForm {
  orderid:number,
  tiktok_id:string,
  total: number,
  max_threads: number,
  insert_date: number,
  note: string,
  follower_start:number,
  follower_total:number,
  service:number,
  follower_order:number,
  user:string
}

export interface OrderForm {
  orderid:number,
  note: string,
  tiktok_id:string,
  max_threads: number,
  service:number,
  follower_order:number,
  user:string
}
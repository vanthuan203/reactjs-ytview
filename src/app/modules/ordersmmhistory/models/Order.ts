export interface OrderModel {
  order_id:number,
  order_key: string,
  order_link: string,
  total_thread: number,
  thread: number,
  insert_time: number,
  start_time: number,
  end_time: number,
  cancel: number,
  update_time: number,
  update_current_time:number,
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
  refund:number,
  refund_time:number,
  refill:number,
  refill_time:number,
  checked?:boolean
}
export interface OrderModelChecked {
  order_id: number,
  id:number
}





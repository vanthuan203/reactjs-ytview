export interface AccountModel {
  service:number,
  category:string,
  name:string,
  rate:number,
  min:number,
  max:number,
  geo:string
  enabled:number,
  maxorder:number,
  search:number,
  suggest:number,
  external:number,
  embed:number,
  direct:number,
  dtn:number,
  mintime:number,
  maxtime:number,
  maxtimerefill:number,
  refill:number,
  thread:number,
  type:string,
  live:number,
  checktime:number
  checked?:boolean
}
export interface OrderModelChecked {
  username: string,
  id:number
}


export interface AccountForm {
  service:number,
  category:string,
  rate:number,
  min:number,
  name:string,
  max:number,
  geo:string
  enabled:number,
  maxorder:number,
  search:number,
  suggest:number,
  dtn:number,
  mintime:number,
  maxtime:number,
  maxtimerefill:number,
  refill:number,
  external:number,
  embed:number,
  direct:number,
  thread:number,
  live:number,
  type:string,
  checktime:number
}

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
  platform:string,
  live:number,
  checktime:number
  checked?:boolean,
  niche:number,
  playlists:number,
  expired:number,
  click_ads:number,
  click_web:number,
  keyniche:string


}
export interface OrderModelChecked {
  id: number,
  service:number,
  platform:string,
  category:string,
  type:string,
  quantity:string,
  name:string,
  source:string,
  geo:string,
  rate: number,
  guarantee:string,
  retention:string
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

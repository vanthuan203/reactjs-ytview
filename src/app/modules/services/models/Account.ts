export interface AccountModel {
  service:number,
  category:string,
  name:string,
  rate:number,
  min:number,
  max:number,
  note:string
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
  note:string
}

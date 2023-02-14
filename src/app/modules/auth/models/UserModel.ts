import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  id: number
  username: string
  role:string 
  balance:number
  discount:number
  vip:number,
  maxorder:number,
  bonus:number,
  price:number,
}

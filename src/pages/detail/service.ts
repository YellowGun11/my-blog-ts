import request from '../../utils/myRequest'
import { ListItem } from '../home/data.d'

export async function getDetail(id:string) {
  return request<ListItem>({
    url:`/api/detial/${id}`,
    method:'get',
  })
}
import request from '../../utils/myRequest'
import { AboutData } from './data.d'

export async function getAbout() {
  return request<AboutData>({
    url:'/api/about',
    method:'get',
  })
}
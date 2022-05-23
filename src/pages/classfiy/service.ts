import request from '../../utils/myRequest'
import { ClassifyData } from './data.d'

export async function getClassify() {
  return request<ClassifyData>({
    url:'/api/classify',
    method:'get',
  })
}
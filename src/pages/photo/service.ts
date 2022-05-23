import request from "../../utils/myRequest";
import { PhotoData, Pagination } from "./data.d"

export async function getPhoto (params:Pagination) {
  return request<PhotoData>({
    url:'/api/photo',
    method:'get',
    params
  })
}
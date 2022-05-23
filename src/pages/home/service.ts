import request from "../../utils/myRequest";
import { ArticleData, Pagination, UserInfo } from "./data.d"

export async function getArticle (params:Pagination) {
  return request<ArticleData>({
    url:'/api/article',
    method:'get',
    params
  })
}

export async function getUser() {
  return request<UserInfo>({
    url:'/api/user',
    method:'get'
  })
}
import request from "../utils/request";


export function getArticleList(params:any){
  return request('/api/home/article',{
    params
  })
}

export function getUserInfo(){
  return request('/home/user',{})
}

// export function postApi(bodyData:any) {
//   return request('/api', {
//     method: 'post',
//     body: bodyData,
//   });
// }
export interface PhotoItem {
  id: string;
  name: string;
  createTime?: string;
  updateTime?: string;
  status: number;
  imgUrl: string;
}

export type PhotoList = PhotoItem[]

export interface PhotoData{
  list: PhotoList;
  total: number;
}

export interface Pagination{
  current:number;
  pageSize:number;
}
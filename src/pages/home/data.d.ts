export interface ListItem {
  id: string;
  title: string;
  des: string;
  content?: string;
  tag: string[];
  createTime?: string;
  updateTime?: string;
  readNum: number;
  status: number;
  imgUrl: string;
}

export type ListData = ListItem[]

export interface Pagination{
  current:number;
  pageSize:number;
  type?:number;
}

export interface UserInfo{
  name:string;
  avtorUrl:string;
  des:string;
  location:string;
  social:string[]
}

export interface ArticleData{
  list:ListData;
  total:number;
}
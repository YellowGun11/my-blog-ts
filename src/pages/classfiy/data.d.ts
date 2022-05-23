export interface ClassifyItem {
  id: string;
  name: string;
  status: number;
  createTime?: string;
  updateTime?: string;
}

export type ClassifyList = ClassifyItem[]

export interface ClassifyData{
  list: ClassifyList;
  total: number;
}

import { AnyAction, Dispatch } from "redux";
import { getClassify } from '../../pages/classfiy/service'
import { ClassifyList } from '../../pages/classfiy/data.d'

export type ClassifyState = {
  classifyList: ClassifyList
}

const initialState:ClassifyState = {
  classifyList: []
}

// action types
export const types = {
  CLASSIFY_DATA: "CLASSIFY/GET_LIST", // 获取分类列表
}

// action creators
export const actions = {
  // 异步action
  getClassifyList: () => {
    return (dispatch: Dispatch) => {
      return getClassify().then(response => {
        if(response.code===0){
          dispatch(fetchClassifyList(response.data.list))
        }else{
          console.error(response.message)
        }
      })
    }
  }
}

//action
const fetchClassifyList = (data:ClassifyList) => ({
  type: types.CLASSIFY_DATA,
  payload: data
})

const reducer = (state: ClassifyState = initialState, action: AnyAction) => {
  switch(action.type){
    case types.CLASSIFY_DATA:
      return { ...state, classifyList:action.payload }
    default:
      return state;
  }
}

export default reducer;
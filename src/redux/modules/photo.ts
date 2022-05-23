import { AnyAction, Dispatch } from 'redux'
import { getPhoto } from '../../pages/photo/service'
import { PhotoList } from '../../pages/photo/data.d'

export type PhotoState = {
  photoList: PhotoList
}

const initialState:PhotoState = {
  photoList: []
}

// action types
export const types = {
  PHOTO_DATA: "PHOTO/GET_LIST",  // 获取图片列表
}

// action creators
export const actions = {
  // 异步action
  getPhotoList: (current:number, pageSize:number) => {
    return (dispatch: Dispatch) => {
      const params = { current, pageSize }
      return getPhoto(params).then(response => {
        if(response.code===0){
          dispatch(fetchPhotoList(response.data.list))
        }else{
          console.log(response.message)
        }
      })
    }
  }
}

// action
const fetchPhotoList = (data:PhotoList) => ({
  type: types.PHOTO_DATA,
  payload:data
})

// reducers
const reducer = (state: PhotoState = initialState, action:AnyAction) => {
  switch(action.type) {
    case types.PHOTO_DATA:
      return { ...state, photoList:action.payload };
    default:
      return state;
  }
};

export default reducer;

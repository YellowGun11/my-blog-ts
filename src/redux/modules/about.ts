import { AnyAction, Dispatch } from 'redux';
import { getAbout } from '../../pages/about/service'
import { AboutData } from '../../pages/about/data.d'

export type AboutState = {
  aboutData: AboutData
}

const initialState: AboutState = {
  aboutData: {} as AboutData
}

// action types
export const types = {
  ABOUT_DATA: "ABOUT/GET_ABOUT" // 获取关于信息
}

// action creators
export const actions = {
  // 异步action
  getAbout: () => {
    return (dispatch:Dispatch) => {
      return getAbout().then(response => {
        if(response.code === 0) {
          dispatch(fetchAbout(response.data))
        } else {
          console.log(response.message)
        }
      })
    }
  }
}

// action
const fetchAbout = (data:AboutData) => ({
  type: types.ABOUT_DATA,
  payload: data
})

// reducers
const reducer = (state:AboutState = initialState, action:AnyAction ) => {
  switch(action.type) {
    case types.ABOUT_DATA:
      return { ...state, aboutData: action.payload }
    default:
      return state
  }
}

export default reducer;
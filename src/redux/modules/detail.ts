import { AnyAction, Dispatch } from 'redux';
import { getDetail } from '../../pages/detail/service'
import { ListItem } from '../../pages/home/data.d'

export type DetailState = {
  detialData:ListItem,
}

const initialState:DetailState = {
    detialData: {} as ListItem
};

// action types
export const types = {
  DETAIL_DATA: "HOME/GET_LIST",    //获取文章详情
};

// // action creators
export const actions = {
  // 异步action
  getDetailData: (id:string) => {
    return (dispatch:Dispatch) => {
      return getDetail(id).then(response => {
        if (response.code===0) {
          dispatch(fetchDetail(response.data));
        } else {
          console.log(response.message)
        }
      });
    };
  },
};

// action
const fetchDetail = (data:ListItem) => ({
  type: types.DETAIL_DATA,
  payload:data
});

// reducers
const reducer = (state: DetailState = initialState, action:AnyAction) => {
  switch (action.type) {
    case types.DETAIL_DATA:
      return { ...state, detialData: action.payload };
    default:
      return state;
  }
};

export default reducer;
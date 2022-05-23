import { AnyAction, Dispatch } from 'redux';
import { getArticle, getUser } from '../../pages/home/service'
import { ListData, UserInfo } from '../../pages/home/data.d'

export type HomeState = {
  articleList:ListData,
  userInfo: UserInfo
}

const initialState:HomeState = {
  articleList: [],
  userInfo: {} as UserInfo
};

// action types
export const types = {
  LIST_DATA: "HOME/GET_LIST",    //获取文章列表
  USER_DATA: "HOME/GET_USER"   //获取用户信息
};

// // action creators
export const actions = {
  // 异步action
  getHomeList: (current:number, pageSize:number, type?:number) => {
    return (dispatch:Dispatch) => {
      const params = { current, pageSize, type };
      return getArticle(params).then(response => {
        if (response.code===0) {
          dispatch(fetchArticleList(response.data.list));
        } else {
          console.log(response.message)
        }
      });
    };
  },
  // 异步action
  getUserData: () => {
    return (dispatch:Dispatch) => {
      return getUser().then(response => {
        if (response.code===0) {
          console.log('response.data')
          console.log(response.data)
          dispatch(fetchUserInfo(response.data));
        } else {
          console.log(response.message)
        }
      });
    };
  },
};

// action
const fetchArticleList = (data:ListData) => ({
  type: types.LIST_DATA,
  payload:data
});

const fetchUserInfo = (data:UserInfo) => ({
  type: types.USER_DATA,
  payload:data
});

// reducers
const reducer = (state: HomeState = initialState, action:AnyAction) => {
  switch (action.type) {
    case types.LIST_DATA:
      return { ...state, articleList: action.payload };
    case types.USER_DATA:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default reducer;

// // selectors
// export const getLoggedUser = state => state.auth;
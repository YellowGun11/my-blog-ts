import { combineReducers, ReducersMapObject, AnyAction, Reducer } from "redux";
import homeReducer, { HomeState } from "./home";
import photoReducer, { PhotoState } from "./photo";
import classifyReducer, { ClassifyState } from "./classify";
import aboutReducer, { AboutState } from "./about";
import detailReducer, { DetailState } from "./detail";

export interface CombinedState {
  homeReducer: HomeState,
  photoReducer: PhotoState,
  classifyReducer: ClassifyState,
  aboutReducer: AboutState,
  detailReducer: DetailState
}

// 合并所有模块的reducer成一个根reducer
const reducers: ReducersMapObject<CombinedState, AnyAction> = {
  homeReducer,
  photoReducer,
  classifyReducer,
  aboutReducer,
  detailReducer
};
const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);

export default rootReducer;

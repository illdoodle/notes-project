import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {arrowReducer} from "./reducer/arrowReducer";

const rootReducer = combineReducers({
    arrow: arrowReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>

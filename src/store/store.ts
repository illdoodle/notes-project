import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {arrowReducer} from "./reducer/arrowReducer";
import {modalReducer} from "./reducer/modalReducer";

const rootReducer = combineReducers({
    arrow: arrowReducer,
    modal: modalReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>

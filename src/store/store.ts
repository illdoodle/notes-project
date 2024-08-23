import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {arrowReducer} from "./reducer/arrowReducer";
import {modalReducer} from "./reducer/modalReducer";
import {notesReducer} from "./reducer/notesReducer";

const rootReducer = combineReducers({
    arrow: arrowReducer,
    modal: modalReducer,
    notes: notesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>

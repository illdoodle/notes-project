import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {arrowReducer} from "./reducer/arrowReducer";
import {modalReducer} from "./reducer/modalReducer";
import {notesReducer} from "./reducer/notesReducer";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type persistConfigState = {
    key: string,
    storage: typeof storage,
    whitelist?: string[],
    blacklist?: string[],
}

const persistConfig: persistConfigState = {
    key: 'root',
    storage,
    whitelist: ['notes']
}

const rootReducer = combineReducers({
    notes: notesReducer,
    modal: modalReducer,
    arrow: arrowReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react'
import NotesLoading from "./components/NotesLoading/NotesLoading";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={<NotesLoading/>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

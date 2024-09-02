import {useTypedSelector} from "../../hooks/useTypedSelector";
import React from "react";
import NotesLoading from "../NotesLoading/NotesLoading";

const NotesPageState: React.FC = () => {
    const notes = useTypedSelector(state => state.notes);
    if (notes.error !== null) {
        return <div>{notes.error}</div>
    }
    if (notes.loading) {
        return <NotesLoading/>;
    }
    if(!notes.notes.length) {
        return <h1>Добавьте Заметку!</h1>
    }
    return
};

export default NotesPageState;
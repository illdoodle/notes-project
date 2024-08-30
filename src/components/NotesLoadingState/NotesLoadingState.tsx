import {useTypedSelector} from "../../hooks/useTypedSelector";

const NotesLoadingState = () => {
    const notes = useTypedSelector(state => state.notes);
    if (notes.error !== null) {
        return <div>{notes.error}</div>
    }
    if (notes.loading) {
        return <h1>ЗАГРУЗКА...</h1>
    }
    if(!notes.notes.length) {
        return <h1>Добавьте Заметку!</h1>
    }
};

export default NotesLoadingState;
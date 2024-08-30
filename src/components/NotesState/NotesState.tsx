import {useTypedSelector} from "../../hooks/useTypedSelector";

const NotesState = () => {
    const notes = useTypedSelector(state => state.notes);
    if (notes.loading) {
        return <h1>ЗАГРУЗКА...</h1>
    }
    if (notes.error !== null) {
        return <div>{notes.error}</div>
    }
};

export default NotesState;
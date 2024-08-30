import React from 'react';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from "../NotesPage/NotesPage.module.css";

const MoreNotesButton = () => {
    const {fetchNotes} = useActions();
    const notes = useTypedSelector(state => state.notes);
    function moreNotes(e: React.MouseEvent<HTMLButtonElement>) {
        fetchNotes(notes.notes);
        (e.target as HTMLButtonElement).blur();
    }
    return (
        <div className={styles.moreBtn}>
            <button onClick={moreNotes}>MORE NOTES</button>
        </div>
    );
};

export default MoreNotesButton;
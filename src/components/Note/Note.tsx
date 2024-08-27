import styles from './Note.module.css';
import React from "react";
import {NoteType} from "../../types/note";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

type PropsType = {
    index: number,
    note: NoteType,
}

const Note: React.FC<PropsType> = (props: PropsType) => {
    const notes = useTypedSelector(state => state.notes)
    const {setNotes} = useActions();

    function removeNote(note: NoteType) {
        setNotes(notes.notes.filter((n: NoteType) => n.id !== note.id));
    }

    function setComplete(note: NoteType) {
        note.completed = !note.completed;
        setNotes([...notes.notes]);
    }

    return (
        <div className={styles.note}>
          <div
            className={`${styles.id} ${props.note.completed ? styles.completed : ''}`}
            onClick={() => {setComplete(props.note)}}
          >
            <span>{props.index}</span>
          </div>
          <div className={styles.text}>
            <span id='text'>{props.note.title}</span>
          </div>
          <div className={styles.delete}>
            <img src='src/components/images/bin.svg' alt='bin.png' className={`UIButton`} onClick={() => {removeNote(props.note)}}/>
          </div>
        </div>
    )
}

export default Note;
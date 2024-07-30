import styles from './Note.module.css';
import React from "react";
import {NoteType} from "../Notes/Note.types";

type ArgsType = {
    index: number,
    note: NoteType,
    check: (note: NoteType) => void,
    delete: (note: NoteType) => void,
}
const Note: React.FC<ArgsType> = (props) => {
    return (
        <div className={styles.note}>
          <div
            className={`${styles.id} ${props.note.completed ? styles.completed : ''}`}
            onClick={() => {props.check(props.note)}}
          >
            <span>{props.index}</span>
          </div>
          <div className={styles.text}>
            <span id='text'>{props.note.title}</span>
          </div>
          <div className={styles.delete}>
            <img src='src/components/Notes/images/bin.svg' alt='bin.png' className={`UIButton`} onClick={() => {props.delete(props.note)}}/>
          </div>
        </div>
    )
}

export default Note;
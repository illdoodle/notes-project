import React from 'react';
import Note from "../Note/Note";
import {NoteType} from "../Note.types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "../Notes.module.css";

const NotesList = ({notes, removeNote, setComplete}) => {
    return (
        <TransitionGroup className={styles.list}>
            {notes.map((note:NoteType, index:number) =>
                <CSSTransition
                    key={note.id}
                    nodeRef={note.noteRef}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    timeout={500}
                >
                    <div className='note-container' ref={note.noteRef}>
                        <Note delete={removeNote} check={setComplete} index={index + 1} note={note}/>
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default NotesList;
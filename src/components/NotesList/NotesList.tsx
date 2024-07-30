import React from 'react';
import Note from '../Note/Note';
import {NoteType} from '../Notes/Note.types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from '../Notes/Notes.module.css';

type ArgsType = {
    notes: NoteType[],
    removeNote: (note: NoteType) => void,
    setComplete: (note: NoteType) => void,
}
const NotesList: React.FC<ArgsType> = (props) => {
    return (
        <TransitionGroup className={styles.list}>
            {props.notes.map((note: NoteType, index: number) =>
                <CSSTransition
                    key={note.id}
                    // nodeRef={note.noteRef}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    timeout={500}
                >
                    {/*<div className='note-container' ref={note.noteRef}>*/}
                        <Note delete={props.removeNote} check={props.setComplete} index={index + 1} note={note}/>
                    {/*</div>*/}
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default NotesList;
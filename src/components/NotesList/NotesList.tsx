import React from 'react';
import Note from '../Note/Note';
import {NoteType} from '../../types/note';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from '../NotesPage/NotesPage.module.css';

type ArgsType = {
    notes: NoteType[],
}

const NotesList: React.FC<ArgsType> = (props) => {
    return (
        <TransitionGroup className={styles.list}>
            {props.notes.map((note: NoteType, index: number) =>
                <CSSTransition
                    key={note.id}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    timeout={500}
                >
                    <Note index={index + 1} note={note}/>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default NotesList;
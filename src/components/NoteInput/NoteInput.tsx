import React, {createRef, MutableRefObject, useRef} from 'react';
import styles from "../NotesPage/NotesPage.module.css";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const NoteInput = () => {
    const {setModal, setNotes} = useActions();
    const notes = useTypedSelector(state => state.notes)
    const noteInput: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    function addNote(title: string) {
        if(!title.trim()) {
            setModal({visible: true, message: 'Введите данные.'});
            return;
        }
        setNotes([
            {
                id: Date.now(),
                title,
                completed: false,
                userId: 1,
                noteRef: createRef(),
            },
            ...(notes.notes),
        ]);
        noteInput.current.value = '';
    }

    function checkKeyAndAddNote(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.code == 'Enter') {
            noteInput.current.blur();
            addNote(noteInput.current.value)
        }
    }

    function sendNote() {
        addNote(noteInput.current.value)
    }

    return (
        <div className={styles.input}>
            <input
                ref={noteInput}
                type='text'
                maxLength={50}
                placeholder='Enter...'
                className={styles.inputEnter}
                onKeyDown={checkKeyAndAddNote}
            />
            <div className={styles.buttons}>
                <img src='src/public/images/plus.svg' alt='plus.png' className={`UIButton ${styles.add}`} onClick={sendNote}/>
                <img src='src/public/images/bin.svg' alt='bin.png' className={`UIButton ${styles.clear}`} onClick={setNotes.bind(this,[])}/>
            </div>
        </div>
    );
};

export default NoteInput;
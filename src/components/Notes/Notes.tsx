import React, {createRef, useEffect, useRef, useState, MutableRefObject, ReactNode} from 'react';
import styles from './Notes.module.css';
import Modal from '../Modal/Modal'
import {NoteType} from '../../types/note';
import NotesList from '../NotesList/NotesList';
import Arrow from '../Arrow/Arrow';
import axios, {AxiosResponse} from 'axios';
import {useScroll} from "../../hooks/useScroll";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalState} from "../../types/modal";
import {useActions} from "../../hooks/useActions";

const Notes: React.FC = () => {
  const notesPerLoad: number = 10;
  const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(notesPerLoad);
  const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);
  const [notes, setNotes] = useState <NoteType[]>([]);
  const noteInput: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const {setArrow, setModal} = useActions();
  const [modalMsg, setModalMsg] = useState <string>('');
  const modal: ModalState = useTypedSelector(state => state.modal)

  //После рефактора на redux заняться декомпозицией.

  function addNote() {
    setNotes([
      {
        id: Date.now(),
        title: noteInput.current.value,
        completed: false,
        userId: 1,
        noteRef: createRef(),
      },
      ...(notes),
    ]);
    noteInput.current.value = '';
  }

  function removeNote(note:NoteType) {
    setNotes(notes.filter((n:NoteType) => n.id !== note.id));
  }

  function setComplete(note:NoteType) {
    note.completed = !note.completed;
    setNotes([...notes]);
  }

  function send(callback: () => void, ref: MutableRefObject<HTMLInputElement> = null) {
    if(!ref.current.value.trim()) {
      setModalMsg('Введите данные.');
      setModal(true);
      return;
    }
    callback();
  }

  function updateNotes() {
    setCurrentNotes(notes.slice(0, visibleNotesAmount));
  }

  function loadNotes() {
    if(visibleNotesAmount <= notes.length) {
      setVisibleNotesAmount(visibleNotesAmount + notesPerLoad);
    }
  }

  //После переноса notes на redux эту функцию вынести в файл useScroll
  function scrollHandler() {
    const scrollData = useScroll();
    if(scrollData.scrolled > document.documentElement.clientHeight) {
      setArrow(true);
    } else {
      setArrow(false);
    }

    if(scrollData.scrolled >= scrollData.documentHeight) {
      loadNotes();
    }
  }

  function blurNoteInput():ReactNode {
    noteInput.current.blur();
    return <></>
  }

  //Чтобы при первом скролле вернуться в начало страницы, т.к. при первом скролле высота документа не увеличивается (некуда скроллить).
  if(visibleNotesAmount == notesPerLoad * 2) window.scrollTo(0, 0);

  useEffect(() => {
    axios.get<NoteType[]>('https://jsonplaceholder.typicode.com/todos?_limit=50')
      .then((response: AxiosResponse<NoteType[]>) => {
        setNotes(response.data)
      });
  }, [])

  useEffect(() => {
    updateNotes();
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [notes, visibleNotesAmount])

  return (
      <div className={styles.root}>
        <Arrow />
        <Modal
            visible={modal.visible}
        >
          {modal.visible && blurNoteInput()}
          <span>{modalMsg}</span>
        </Modal>
        <div className={styles.headText}>
          <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
          <input
              ref={noteInput}
              type='text'
              maxLength={50}
              placeholder='Enter...'
              className={styles.inputEnter}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {e.code == 'Enter' ? send(addNote, noteInput) : null}}
          />
          <div className={styles.buttons}>
            <img src='src/components/images/plus.svg' alt='plus.png' className={`UIButton ${styles.add}`} onClick={() => {send(addNote, noteInput)}}/>
            <img src='src/components/images/bin.svg' alt='bin.png' className={`UIButton ${styles.clear}`} onClick={() => setNotes([])}/>
          </div>
        </div>
        <NotesList removeNote={removeNote} setComplete={setComplete} notes={currentNotes}/>
        <div className={styles.moreBtn}>
          <button onClick={(e:any) => {
            loadNotes();
            e.target.blur();
          }}>MORE NOTES</button>
        </div>
      </div>
  )
}

export default Notes;


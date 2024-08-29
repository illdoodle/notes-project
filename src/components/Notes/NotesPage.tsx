import React, {createRef, useEffect, useRef, useState, MutableRefObject, ReactNode} from 'react';
import styles from './Notes.module.css';
import Modal from '../Modal/Modal'
import {NoteType} from '../../types/note';
import NotesList from '../NotesList/NotesList';
import Arrow from '../Arrow/Arrow';
import {useScroll} from "../../hooks/useScroll";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalState} from "../../types/modal";
import {useActions} from "../../hooks/useActions";
import {notesPerLoad} from "../../config/notes";

const NotesPage: React.FC = () => {
  const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(notesPerLoad);
  const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);
  const [modalMsg, setModalMsg] = useState <string>('');
  const modal: ModalState = useTypedSelector(state => state.modal)
  const noteInput: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const notes = useTypedSelector(state => state.notes)
  const {fetchNotes, setNotes, setArrow, setModal} = useActions();

  function addNote(title: string) {
    if(!title.trim()) {
      setModalMsg('Введите данные.');
      setModal(true);
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

  function updateNotes() {
    setCurrentNotes(notes.notes.slice(0, visibleNotesAmount));
  }

  function loadNotes() {
    if(visibleNotesAmount <= notes.notes.length) {
      setVisibleNotesAmount(visibleNotesAmount + notesPerLoad);
    }
  }

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

  function blurNoteInput(): ReactNode {
    noteInput.current.blur();
    return <></>;
  }

  function checkKeyAndAddNote(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.code == 'Enter') {
      addNote(noteInput.current.value)
    }
  }

  function moreNotes(e: React.MouseEvent<HTMLButtonElement>) {
    //Надо сделать, чтобы по нажатию этой кнопки подгружалось еще больше нотесов с сервера.
    //По идее, для этого потребуется для начала развернуть предыдущий массив с нотесами, а потом уже добавлять развернутый зафетченный.
    //fetchNotes();
    loadNotes();
    (e.target as HTMLButtonElement).blur();
  }

  function sendNote() {
    addNote(noteInput.current.value)
  }

  //Чтобы при первом скролле вернуться в начало страницы, т.к. при первом скролле высота документа не увеличивается (некуда скроллить).
  if(visibleNotesAmount == notesPerLoad * 2) window.scrollTo(0, 0);

  useEffect(() => {
    updateNotes();
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [notes, visibleNotesAmount])

  useEffect(() => {
     fetchNotes();
  }, [])

  if (notes.loading) return <h1>Идёт загрузка...</h1>;
  if (notes.error) return <h1>Ошибка: {notes.error}</h1>;

  return (
      <div className={styles.root}>
        <Arrow />
        <Modal visible={modal.visible}>
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
              onKeyDown={checkKeyAndAddNote}
          />
          <div className={styles.buttons}>
            <img src='src/public/images/plus.svg' alt='plus.png' className={`UIButton ${styles.add}`} onClick={sendNote}/>
            <img src='src/public/images/bin.svg' alt='bin.png' className={`UIButton ${styles.clear}`} onClick={setNotes.bind(this,[])}/>
          </div>
        </div>
        <NotesList notes={currentNotes}/>
        <div className={styles.moreBtn}>
          <button onClick={moreNotes}>MORE NOTES</button>
        </div>
      </div>
  )
}

export default NotesPage;


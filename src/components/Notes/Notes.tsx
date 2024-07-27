  import React, {createRef, useEffect, useRef, useState, MutableRefObject} from 'react';
  import styles from './Notes.module.css';
  import Modal from '../Modal/Modal'
  import {NoteType} from './Note.types';
  import NotesList from '../NotesList/NotesList';
  import Arrow from '../Arrow/Arrow';
  import axios from 'axios';

  const Notes: React.FC = () => {
    const [notes, setNotes] = useState <NoteType[]>([]);
    const [modal, setModal] = useState <boolean>(false);
    const [modalMsg, setModalMsg] = useState <string>('');
    const [arrow, setArrow] = useState <boolean>(false);
    const noteInput = useRef<HTMLInputElement>(null);

    const notesPerLoad: number = 10;
    const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(notesPerLoad);
    const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);

    function addNote(): void {
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

    function removeNote(note:NoteType): void {
      setNotes(notes.filter((n:NoteType) => n.id !== note.id));
    }

    function setComplete(note:NoteType): void {
      note.completed = !note.completed;
      setNotes([...notes]);
    }

    function send(callback: () => void, ref: MutableRefObject<HTMLInputElement> = null): void {
      if(!ref.current.value.trim()) {
        setModalMsg('Введите данные.');
        setModal(true);
        return;
      }
      callback();
    }

    function loadNotes(): void {
      if(visibleNotesAmount <= notes.length) {
        // !!!По некоторым неведанным мне причинам функция проходит по много раз сразу, нужно фиксить!!!
        // useMemo?
        setVisibleNotesAmount(visibleNotesAmount + notesPerLoad);
      }
    }

    function updateNotes(): void {
      setCurrentNotes(notes.slice(0, visibleNotesAmount));
    }

    function scrollHandler(): void {
      const scrolled: number = document.documentElement.clientHeight + document.documentElement.scrollTop;
      const documentHeight: number = document.documentElement.scrollHeight;

      if(scrolled > document.documentElement.clientHeight) {
        setArrow(true);
      } else {
        setArrow(false);
      }
      if(scrolled >= documentHeight) loadNotes();
    }
    document.addEventListener('scroll', scrollHandler);

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50').then((response: axios.AxiosResponse<NoteType[]>) => setNotes(response.data));
      window.scrollTo(0, 0); // По каким то причинам не работает. После обновления страницы она немного сдвинута вниз.
      return () => {
        document.removeEventListener('scroll', scrollHandler);
      }
    }, [])

    useEffect(() => {
      updateNotes();
    }, [notes, visibleNotesAmount])

    return (
      <div className={styles.root}>
        {arrow && <Arrow close={() => {
          setArrow(false);
          window.scrollTo(0, 0);
        }}/>}
        <Modal
          visible={modal}
          onClose={() => setModal(false)}
        >
          {modal && noteInput.current.blur()}
          <span>{modalMsg}</span>
        </Modal>
        <div className={styles.headText}>
          <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
          <input
            ref={noteInput}
            type='text'
            maxLength='50'
            placeholder='Enter...'
            className={styles.inputEnter}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {e.code == 'Enter' ? send(addNote, noteInput) : null}}
          />
          <div className={styles.buttons}>
            <img src='src/components/Notes/images/plus.svg' alt='plus.png' className={`UIButton ${styles.add}`} onClick={() => {send(addNote, noteInput)}}/>
            <img src='src/components/Notes/images/bin.svg' alt='bin.png' className={`UIButton ${styles.clear}`} onClick={() => setNotes([])}/>
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


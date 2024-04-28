import {createRef, useEffect, useRef, useState} from 'react';
import styles from './Notes.module.css';
import Modal from '../Modal/Modal'
import {NoteType} from "./Note.types";
import NotesList from "./NotesList/NotesList";

function Notes() {
  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState <NoteType[]>(jsonNotes ? JSON.parse(jsonNotes) : []);
  const [modal, setModal] = useState (false);
  const [modalMsg, setModalMsg] = useState("");
  const noteInput = useRef(null);

  function addNote(inputElement:HTMLInputElement){
    if(notes.length >= 10){
      //Временное решение без пагинации.
      setModalMsg('Слишком много заметок.');
      setModal(true);
      return;
    }
    if(!inputElement.value.trim()){
      setModalMsg('Введите данные.');
      setModal(true);
      return;
    }
    setNotes([
      {
        id: Date.now(),
        title: inputElement.value,
        completed: false,
        userId: 1,
        noteRef: createRef(),
      },
      ...(notes),
    ]);
    inputElement.value = '';
  }

  function removeNote(note:NoteType) {
    setNotes(notes.filter((n:NoteType) => n.id !== note.id));
  }

  function setComplete(note:NoteType){
    note.completed = !note.completed;
    setNotes([...notes]);
  }

  function sendNote(e) {
    if(e.code && e.code !== "Enter"){
      return;
    }
    addNote(noteInput.current)
  }

  function closeModal(){
    setModal(false);
  }

  function scrollHandler(){
    console.log('scroll')
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return (
    <div className={styles.root}>
      <Modal visible={modal} onClose={closeModal}>
        {modal && noteInput.current.blur()}
        <span>{modalMsg}</span>
      </Modal>
      <div className={styles.headText}>
        <h1>TO-DO LIST</h1>
      </div>
      <div className={styles.input}>
        <input
          ref={noteInput}
          type="text"
          maxLength="50"
          placeholder='Enter...'
          className={styles.inputEnter}
          onKeyDown={(e) => {sendNote(e)}}
        />
        <div className={styles.buttons}>
          <img src="src/images/plus.png" alt="plus.png" className={`UIButton ${styles.add}`} onClick={(e) => {sendNote(e)}}/>
          <img src="src/images/bin.png" alt="bin.png" className={`UIButton ${styles.clear}`} onClick={() => setNotes([])}/>
        </div>
      </div>
      <div className={styles.list}>
        <NotesList removeNote={removeNote} setComplete={setComplete} notes={notes}/>
      </div>
    </div>
  )
}

export default Notes;


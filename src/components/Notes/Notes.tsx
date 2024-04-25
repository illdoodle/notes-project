import {createRef, useEffect, useRef, useState} from 'react';
import styles from './Notes.module.css';
import Note from '../Note/Note';
import Modal from '../Modal/Modal'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {NoteTypes} from "./Note.types";

function Notes() {

  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState <NoteTypes[]>(jsonNotes ? JSON.parse(jsonNotes) : []);
  const [modal, setModal] = useState (false);
  const [modalMsg, setModalMsg] = useState("");
  const noteInput = useRef(null);
  //Касательно пункта о "типизировать все структуры данных по аналогии". Непонятно, стоит ли применять <Note[]> так же к setNotes (например и т.д.)

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
        text: inputElement.value,
        completed: false,
        noteRef: createRef(),
      },
      ...(notes),
    ]);
    inputElement.value = '';
    console.log(notes)
  }

  function removeNote(note:Note) {
    setNotes(notes.filter((n) => n.id !== note.id));
  }

  function setComplete(note:Note){
    note.completed = !note.completed;
    setNotes([...notes]);
  }

  function sendNote(e) {
    if(e.code == "Enter" || e.target.tagName == "BUTTON"){
      addNote(noteInput.current)
    }
  }

  function closeModal(){
    setModal(false);
  }
  
  useEffect(() => {
    //Временно отключено до внедрения Redux.
    // localStorage.setItem('notes', JSON.stringify(notes));
  },[notes])

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
        <button className={styles.addBtn} onClick={(e) => {sendNote(e)}}>ADD</button>
        <button className={styles.clearBtn} onClick={() => setNotes([])}>CLEAR</button>
      </div>
      <div className={styles.list}>
        <TransitionGroup>
          {notes.map((note:Note, index:number) =>
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
              <div ref={note.noteRef}>
                <Note delete={removeNote} check={setComplete} index={index + 1} note={note}/>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Notes;


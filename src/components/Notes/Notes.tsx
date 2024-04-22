import {useEffect, useRef, useState} from 'react';
import styles from './Notes.module.css';
import Note from '../Note/Note';
import Modal from '../Modal/Modal'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Notes() {

  type Note = {
    id: number,
    text: string,
    completed: boolean,
  }

  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState <Note[]>(jsonNotes ? JSON.parse(jsonNotes) : []);
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [noteVisible, setNoteVisible] = useState(true);
  const noteInput = useRef(null);
  const noteRef = useRef(null);
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
        completed: false
      },
      ...(notes),
    ]);
    inputElement.value = '';
  }

  function removeNote(note:Note) {
    setNoteVisible(false);
    setNotes(notes.filter((n) => n.id !== note.id));
  }

  function setComplete(note:Note){
    note.completed = !note.completed;
    setNotes([...notes]);
  }

  function sendNote(e:object) {
    if(e.code == "Enter" || e.target.tagName == "BUTTON"){
      addNote(noteInput.current)
    }
  }
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  },[notes])

  return (
    <div className={styles.root}>
      <Modal visible={modal} setVisible={setModal}>
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
        {/*Удаляется с анимацией только первый удаленный элемент, остальные без, причем будет показывать, что удаляется первый по списку, но в итоге удалится нужный.
        Если удалить все разом (кнопка clear), то все удалятся с задержкой, но первый с анимацией. */}
        <TransitionGroup>
          {notes.map((note:Note, index:number) =>
            <CSSTransition
                in={noteVisible}
                key={note.id}
                nodeRef={noteRef}
                classNames={{
                  enter: styles.enter,
                  enterActive: styles.enterActive,
                  exit: styles.exit,
                  exitActive: styles.exitActive,
                }}
                timeout={1000}
                unmountOnExit
                mountOnEnter
            >
              <div ref={noteRef}>
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


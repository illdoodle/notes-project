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
  const [notes, setNotes] = useState<Note[]>(jsonNotes ? JSON.parse(jsonNotes) : []);
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [noteVisible, setNoteVisible] = useState(true);
  const noteInput = useRef(null);
  const noteRef = useRef(null);

  function addNote(element){
    if(notes.length >= 6){
      //Временное решение без пагинации.
      setModalMsg('Слишком много заметок.');
      setModal(true);
      return;
    }
    if(!element.value.trim()){
      setModalMsg('Введите данные.');
      setModal(true);
      return;
    }
    setNotes([
      {
        id: Date.now(),
        text: element.value,
        completed: false
      },
      ...(notes),
    ]);
    element.value = '';
  }

  function removeNote(note) {
    setNotes(notes.filter((n) => n.id !== note.id));
  }

  function setComplete(note){
    note.completed = !note.completed;   
    setNotes([...notes]);
  }

  function sendNote(e) {
    if(e.code == "Enter" || e.target.tagName == "BUTTON"){
      addNote(noteInput.current)
    }
  }
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  return (
    <div className={styles.root}>
      <Modal visible={modal} setVisible={setModal}>
        <span>{modalMsg}</span>
      </Modal>
      <div>
        <h1>TO-DO LIST</h1>
        <div className={styles.clear}>
          <button onClick={() => setNotes([])}>CLEAR</button>
        </div>
      </div>
      <div className={styles.input}>
        <input
          ref={noteInput}
          type="text"
          maxLength="50"
          placeholder='Enter...'
          className={styles.enter}
          onKeyDown={(e) => {sendNote(e)}}
        />
        <button className={styles.addBtn} onClick={(e) => {sendNote(e)}}>ADD</button>
      </div>
      <div className={styles.list}>
        <TransitionGroup>
          {notes.map((note, index) =>
            <CSSTransition
                in={noteVisible}
                key={note.id}
                nodeRef={noteRef}
                classNames="note"
                timeout={1000}
                unmountOnExit
                mountOnEnter
            >
              <div ref={noteRef}>
                {/*По идее при клике на заметку она должна исчезать, но этого не происходит и изменение классов срабатывает если я кликаю именно на кнопку удаления*/}
                <Note onclick={() => setNoteVisible(false)} delete={removeNote} check={setComplete} index={index} note={note}/>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Notes;


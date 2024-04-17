import {useEffect, useRef, useState} from 'react';
import styles from './Notes.module.css';
import Note from '../Note/Note';

function Notes() {
  type Note = {
    id: number,
    text: string,
    completed: boolean,
  }
  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState<Note[]>(jsonNotes ? JSON.parse(jsonNotes) : []);
  const noteInput = useRef(null);
  function addNote(element){
    setNotes([
      {
        id: Date.now(),
        text: element.value.trim() ? element.value : `здесь показать модальное окно`,
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
            id="notes-enter"
            onKeyDown={(e) => {sendNote(e)}}
            required
          />
          <button className={styles.addBtn} onClick={(e) => {sendNote(e)}}>ADD</button>
        </div>
        <div className={styles.list}>
          {notes.map((note, index) => <Note delete={removeNote} check={setComplete} index={index} key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


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
    const newNotes = notes;
    for (let i = 0; i < newNotes.length; i++) {
      newNotes[i].id++;
    }
    setNotes([
      {
        id: 1,
        text: element.value.trim() ? element.value : `очень странная заметка ${notes.length}`,
        completed: false
      },
      ...newNotes,
    ]);
    element.value = '';
  }

  function removeNote(note) {
    let newNotes = notes;
    newNotes.splice(note.id - 1, 1);
    for (let i = note.id - 1; i < newNotes.length; i++) {
      newNotes[i].id--;
    }
    setNotes([...newNotes]);
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
          {notes.map((note) => <Note delete={removeNote} check={setComplete} key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


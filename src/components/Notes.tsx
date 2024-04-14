import { useEffect, useState } from 'react';
import styles from '../styles/notes.module.css';
import NotesItem from './NotesItem';

function Notes() { 
  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState(jsonNotes ? JSON.parse(jsonNotes) : []);
  
  function addNote(element:any){
    let newNotes = notes;
    for (let i = 0; i < newNotes.length; i++) {
      newNotes[i].id++;
    }
    setNotes([{id: 1, text: element.value.trim() ? element.value : newNotes.length + 1, completed: false}, ...newNotes]);
    element.value = '';
  }

  function removeNote(note:any) {
    let newNotes = notes;
    newNotes.splice(note.id - 1, 1);
    for (let i = note.id - 1; i < newNotes.length; i++) {
      newNotes[i].id--;
    }
    setNotes([...newNotes]);
  }

  function setComplete(note:any){
    note.completed = !note.completed;   
    setNotes([...notes]);
  }
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  return (
    <div className={styles.root}>
        <div className={styles.header}>
          <h1>TO-DO LIST</h1>
          <div className={styles.clear}>
            <button onClick={() => setNotes([])}>CLEAR</button>
          </div>
        </div>
        <div className={styles.input}>
          <input type="text" maxLength={50} placeholder='Enter...' className={styles.enter} id="notes-enter"
            onKeyDown={(e) => {e.code == 'Enter' ? addNote(document.querySelector('#notes-enter')) : true}}
          />
          <button className={styles.addBtn} onClick={() => {addNote(document.querySelector('#notes-enter'))}}>ADD</button>
        </div>
        <div className={styles.list}>
          {notes.map((note:any) => <NotesItem delete={removeNote} check={setComplete} key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


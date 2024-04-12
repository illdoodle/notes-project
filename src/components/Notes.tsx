import { useEffect, useState } from 'react';
import styles from '../styles/notes.module.css';
import NotesItem from './NotesItem';

function Notes() { 
  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState(jsonNotes ? JSON.parse(jsonNotes) : []);
  let newNotes = notes;
  
  function addNote(e:any, element:any){
    e.preventDefault();
    for (let i = 0; i < newNotes.length; i++) {
      newNotes[i].id++;
    }
    setNotes([{id: 0, text: element.value.trim() ? element.value : 'очень странная заметка...'}, ...notes]);
    element.value = '';
  }

  function removeNote(e:any, note:any) {
    e.preventDefault();
    newNotes.splice(note.id, 1);
    for (let i = note.id; i < newNotes.length; i++) {
      newNotes[i].id--;
    }
    setNotes([...newNotes]);
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  return (
    <div className={styles.root}>
        <div className={styles.header}>
          <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
          <input type="text" placeholder='Enter...' className={styles.enter} id="notes-enter"
            onKeyDown={(e) => {e.code == 'Enter' ? addNote(e, document.querySelector('#notes-enter')) : true}}
          />
          <button className={styles.addBtn} onClick={(e) => {addNote(e, document.querySelector('#notes-enter'))}}>ADD</button>
        </div>
        <div className={styles.list}>
          {notes.map((note:any) => <NotesItem delete={removeNote} key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


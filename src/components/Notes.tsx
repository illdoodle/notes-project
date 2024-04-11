import { useEffect, useState } from 'react';
import styles from '../styles/notes.module.css';
import NotesItem from './NotesItem';

function Notes() { 
  const jsonNotes = localStorage.getItem('notes');
  const [notes, setNotes] = useState(jsonNotes ? JSON.parse(jsonNotes) : []);
  
  function addNote(e:any, element:any){
    e.preventDefault();
    setNotes([...notes, {id: notes.length, text: element.value.trim() ? element.value : 'очень странная заметка...'}]);
    element.value = '';
  }

  function removeNote(e:any, note:any) {
    e.preventDefault();
    let newNotes = notes;
    const index = newNotes.findIndex((n:any) => n.id === note.id);
    newNotes.splice(index, 1);
    for (let i = index; i < newNotes.length; i++) {
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


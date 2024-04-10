import { useState } from 'react';
import styles from '../styles/notes.module.css';
import NotesItem from './NotesItem';

function Notes() { 
  const [notes, setNotes] = useState(['bla-bla', 'bla', 'note3',]);
  
  function addNote(e:any){
    e.preventDefault();
    let inputElement = (document.querySelector('#notes-enter') as HTMLInputElement);
    setNotes([...notes, inputElement.value]);
    inputElement.value = '';
  }

  return (
    <div className={styles.root}>
        <div className={styles.header}>
            <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
            <input type="text" placeholder='Enter...' className={styles.enter} id="notes-enter"/>
            <button className={styles.addBtn} onClick={addNote}>ADD</button>
        </div>
        <div className={styles.list}>
          {notes.map((note, index) => <NotesItem key={index} id={index + 1} text={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


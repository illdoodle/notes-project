import { useState } from 'react';
import '../styles/notes.css';
import NotesItem from './NotesItem';

function Notes() { 
  const [notes, setNotes] = useState(['bla-bla', 'note2', 'anothernote']);
  
  // В этой функции есть ерорка, связанная с тем, что ВОЗМОЖНО noteInput = null и более того, что у него не существует свойства value. Больше ворнинг, чем ошибка. ХЗ как исправить.
  function addNote(e:any){
    e.preventDefault();
    const noteInput = document.querySelector('.notes-enter');
    console.log(noteInput.value);
  }
  return (
    <div className="notes-root">
        <div className="notes-header">
            <h1>TO-DO LIST</h1>
        </div>
        <div className='notes-input'>
            <input type="text" placeholder='Enter...' className='notes-enter'/>
            <button className="notes-submit-btn" onClick={addNote}>ADD</button>
        </div>
        <div className="notes-list">
          {notes.map((note) => <NotesItem key={note} text={note}/>)}
        </div>
    </div>
  )
}

export default Notes;


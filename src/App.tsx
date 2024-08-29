import './styles/app.css';
import NotesPage from './components/Notes/NotesPage.tsx';
import React from 'react';

const App:React.FC = () => {
    //Сделать сохранение notes.
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className='app'>
          <NotesPage/>
        </div>
    )
}

export default App;

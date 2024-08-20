import './styles/app.css';
import Notes from './components/Notes/Notes.tsx';
import React from 'react';

const App:React.FC = () => {
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className='app'>
          <Notes/>
        </div>
    )
}

export default App;

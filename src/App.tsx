import './styles/app.css';
import Notes from './components/Notes/Notes.tsx';
import React from 'react';

const App:React.FC = () => {
    //TODO выглядит как костыль, подумать о том как убрать
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

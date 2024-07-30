import './styles/app.css';
import Notes from './components/Notes/Notes.tsx';
import React from 'react';

const App:React.FC = () => {
    return (
        <div className='app'>
          <Notes/>
        </div>
    )
}

export default App;

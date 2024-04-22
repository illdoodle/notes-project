import React from 'react';
import cl from './Modal.module.css';

function Modal({children, visible, setVisible}) {
    const rootClass = [cl.modal];
    if(visible){
        rootClass.push(cl.active);
        document.addEventListener('keydown', controlContent);
    }else{
        document.removeEventListener('keydown', controlContent);
    }

    function controlContent(e) {
        if(e.code == "Tab") {
            e.preventDefault();
        }

        // Хотел сделать выключение модалки на Enter, но по каким то причинам даже после и !ДО! скрытия модального окна eventListener остается.
        // if(e.code == "Enter") {
        //     setVisible(false);
        // }
    }

    return (
        <div
            className={rootClass.join(' ')}
            onClick={() => {setVisible(false)}}
        >
            <div
                className={cl.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    className={cl.cross}
                    src="src/images/cross.png"
                    alt="cross.png"
                    onClick={() => {setVisible(false)}}
                />
                {children}
            </div>
        </div>
    )
}

export default Modal;
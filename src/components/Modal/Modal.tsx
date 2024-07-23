import React from 'react';
import cl from './Modal.module.css';

function Modal({children, visible, onClose}) {
    const rootClass = [cl.modal];
    if(visible) {
        rootClass.push(cl.active);
        document.addEventListener('keydown', controlContent);
    } else {
        document.removeEventListener('keydown', controlContent);
        return;
    }

    function controlContent(e) {
        if(e.code == 'Tab') {
            e.preventDefault();
        }

        if(e.code == 'Escape') {
            onClose();
        }
    }

    return (
        <div
            className={rootClass.join(' ')}
            onClick={() => {onClose()}}
        >
            <div
                className={cl.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    className={cl.cross}
                    src='src/components/Modal/cross.svg'
                    alt='cross.png'
                    onClick={() => {onClose()}}
                />
                {children}
            </div>
        </div>
    )
}

export default Modal;
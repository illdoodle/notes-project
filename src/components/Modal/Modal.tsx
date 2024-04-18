import React from 'react';
import cl from './Modal.module.css';

function Modal({children, visible, setVisible}) {
    const rootClass = [cl.myModal];
    if(visible){
        rootClass.push(cl.active);
    }
    return (
        <div
            className={rootClass.join(' ')}
            onClick={() => {setVisible(false)}}
        >
            <div
                className={cl.myModalContent}
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
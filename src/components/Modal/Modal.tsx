import React, {ReactNode} from 'react';
import cl from './Modal.module.css';
import {useActions} from "../../hooks/useActions";

type PropsType = {
    children: ReactNode,
    visible: boolean,
}

const Modal: React.FC<PropsType> = (props: PropsType) => {
    const rootClass = [cl.modal];
    const {setModal} = useActions();

    if(props.visible) {
        rootClass.push(cl.active);
        document.addEventListener('keydown', controlContent);
    } else {
        document.removeEventListener('keydown', controlContent);
        return <></>;
    }

    function controlContent(e: KeyboardEvent) {
        if(e.code == 'Tab') {
            e.preventDefault();
        }
        if(e.code == 'Escape') {
            setModal({visible: false, message: null});
        }
    }

    function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }

    return (
        <div
            className={rootClass.join(' ')}
            onClick={setModal.bind(this,{visible: false, message: null})}
        >
            <div
                className={cl.modalContent}
                onClick={stopPropagation}
            >
                <img
                    className={cl.cross}
                    src='src/public/images/cross.svg'
                    alt='cross.png'
                    onClick={setModal.bind(this,{visible: false, message: null})}
                />
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
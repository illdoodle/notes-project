import React, {ReactNode} from 'react';
import cl from './Modal.module.css';
import {useActions} from "../../hooks/useActions";

type PropsType = {
    children: ReactNode,
    visible: boolean,
}

const Modal: React.FC = (props: PropsType) => {
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
            setModal(false);
        }
    }

    return (
        <div
            className={rootClass.join(' ')}
            onClick={() => {setModal(false)}}
        >
            <div
                className={cl.modalContent}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                <img
                    className={cl.cross}
                    src='src/components/images/cross.svg'
                    alt='cross.png'
                    onClick={() => {setModal(false)}}
                />
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
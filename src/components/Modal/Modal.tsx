import React, {ReactNode} from 'react';
import cl from './Modal.module.css';

type ArgsType = {
    children: ReactNode,
    visible: boolean,
    onClose: () => void,
}
const Modal: React.FC<ArgsType> = (props) => {
    const rootClass = [cl.modal];
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
            props.onClose();
        }
    }

    return (
        <div
            className={rootClass.join(' ')}
            onClick={() => {props.onClose()}}
        >
            <div
                className={cl.modalContent}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                <img
                    className={cl.cross}
                    src='src/components/images/cross.svg'
                    alt='cross.png'
                    onClick={() => {props.onClose()}}
                />
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
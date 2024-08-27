import React from 'react';
import styles from './Arrow.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ArrowState} from "../../types/arrow";
import {useActions} from "../../hooks/useActions";

const Arrow: React.FC = () => {
    const arrow: ArrowState = useTypedSelector(state => state.arrow);
    const {setArrow} = useActions();
    const scrollUp = () => {
        setArrow(false);
        window.scrollTo(0, 0);
    }

    // TODO Не использовать аннонимные функции в TSX.
    // TODO При использовании ссылок на картинки, картинки должны находится в папке notes-project/public/images
    return (
        <div className={`${styles.container} UIButton`} onClick={() => scrollUp()} hidden={!arrow.visible}>
            <img src='src/components/images/arrow.svg' alt='arrow.png'/>
        </div>
    );
};

export default Arrow;
import React from 'react';
import styles from './Arrow.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ArrowState} from "../../types/arrow";
import {useActions} from "../../hooks/useActions";

const Arrow: React.FC = () => {
    const arrow: ArrowState = useTypedSelector(state => state.arrow);
    const {setArrow} = useActions();
    function scrollUp() {
        setArrow(false);
        window.scrollTo(0, 0);
    }
    return (
        <div className={`${styles.container} UIButton`} onClick={scrollUp} hidden={!arrow.visible}>
            <img src='src/public/images/arrow.svg' alt='arrow.png'/>
        </div>
    );
};

export default Arrow;
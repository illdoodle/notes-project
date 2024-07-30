import React from 'react';
import styles from './Arrow.module.css';

type ArrowProps = {
    close: () => void,
}
const Arrow: React.FC<ArrowProps>= ({close}) => {
    return (
        <div className={`${styles.container} UIButton`} onClick={() => {close()}}>
            <img src='src/components/Arrow/arrow.svg' alt='arrow.png'/>
        </div>
    );
};

export default Arrow;
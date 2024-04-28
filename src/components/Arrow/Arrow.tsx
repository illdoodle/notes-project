import React from 'react';
import styles from './Arrow.module.css';

const Arrow = ({close}) => {
    return (
        <div className={`${styles.arrow} UIButton`} onClick={() => {close()}}>
            <img src="src/images/arrow.png" alt="arrow.png"/>
        </div>
    );
};

export default Arrow;
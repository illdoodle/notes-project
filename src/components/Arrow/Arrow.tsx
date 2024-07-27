import React from 'react';
import styles from './Arrow.module.css';

const Arrow: React.FC = ({close}: () => void) => {
    return (
        <div className={`${styles.container} UIButton`} onClick={() => {close()}}>
            <img src='src/components/Arrow/arrow.svg' alt='arrow.png'/>
        </div>
    );
};

export default Arrow;
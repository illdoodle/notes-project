import styles from './Note.module.css';

function Note(props) {
    return (
        <div className={styles.note}>
          <div
            className={`${styles.id} ${props.note.completed ? styles.completed : ''}`}
            onClick={() => {props.check(props.note)}}
          >
            <span>{props.index}</span>
          </div>
          <div className={styles.text}>
            <span id='text'>{props.note.title}</span>
          </div>
          <div className={styles.delete}>
            <img src='src/components/Notes/images/bin.svg' alt='bin.png' className={`UIButton`} onClick={() => {props.delete(props.note)}}/>
          </div>
        </div>
    )
}

export default Note;
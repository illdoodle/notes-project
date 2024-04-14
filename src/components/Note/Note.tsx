import styles from './Note.module.css';

function Note(props) {
  return (
    <div className={styles.note}>
      <div
        className={`${styles.id} ${props.note.completed ? styles.completed : ''}`}
        onClick={() => {props.check(props.note)}}
      >
        <span>{props.note.id}</span>
      </div>
      <div className={styles.text}>
        <span id='text'>{props.note.text}</span>
      </div>
      <div className={styles.deleteBtn}>
        <button onClick={() => {props.delete(props.note)}}>DELETE</button>
      </div>
    </div>
  )
}

export default Note;
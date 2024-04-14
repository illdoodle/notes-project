import styles from '../styles/note.module.css';

function NotesItem(props:any) {
  return (
    <div className={styles.note}>
      <div className={styles.id}>
        <span>{props.note.id}</span>
      </div>
      <div className={`${styles.text} ${props.note.completed ? styles.completed : ''}`} onClick={() => {props.check(props.note)}}>
        <span id='text'>{props.note.text}</span>
      </div>
      <div className={styles.deleteBtn}>
        <button onClick={() => {props.delete(props.note)}}>DELETE</button>
      </div>
    </div>
  )
}

export default NotesItem;
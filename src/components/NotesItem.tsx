import styles from '../styles/note.module.css';

function NotesItem(props:any) {
  return (
    <div className={styles.note}>
      <div className={styles.text}>
        <span className={styles.noteId}>{props.id}</span>
        {props.text}
      </div>
      <button className={styles.deleteBtn}>DELETE</button>
    </div>
  )
}

export default NotesItem;
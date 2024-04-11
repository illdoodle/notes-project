import styles from '../styles/note.module.css';

function NotesItem(props:any) {
  return (
    <div className={styles.note}>
      <div className={styles.text}>
        <span className={styles.noteId}>
          <input type="checkbox" className={styles.checkbox}/>
          {props.note.id}
        </span>
        {props.note.text}
      </div>
      <button className={styles.deleteBtn} onClick={(e) => {props.delete(e, props.note)}}>DELETE</button>
    </div>
  )
}

export default NotesItem;
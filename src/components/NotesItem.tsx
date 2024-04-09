function NotesItem({text}:any) {
  return (
    <div className='note'>
        <div className='note-text'>{text}</div>
        <button className='note-delete-btn'>DELETE</button>
    </div>
  )
}

export default NotesItem;
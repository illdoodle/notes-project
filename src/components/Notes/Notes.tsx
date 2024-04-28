  import {createRef, useEffect, useRef, useState} from 'react';
  import styles from './Notes.module.css';
  import Modal from '../Modal/Modal'
  import {NoteType} from "./Note.types";
  import NotesList from "./NotesList/NotesList";
  import Arrow from "../Arrow/Arrow";
  import axios from "axios";

  function Notes() {
    const [notes, setNotes] = useState <NoteType[]>([]);
    const [modal, setModal] = useState (false);
    const [modalMsg, setModalMsg] = useState("");
    const [arrow, setArrow] = useState(false);
    const noteInput = useRef(null);

    const notesPerLoad = 10;
    const [visibleNotesAmount, setVisibleNotesAmount] = useState(notesPerLoad);
    const [currentNotes, setCurrentNotes] = useState([]);

    function addNote(inputElement:HTMLInputElement){
      if(!inputElement.value.trim()){
        setModalMsg('Введите данные.');
        setModal(true);
        return;
      }
      setNotes([
        {
          id: Date.now(),
          title: inputElement.value,
          completed: false,
          userId: 1,
          noteRef: createRef(),
        },
        ...(notes),
      ]);
      inputElement.value = '';
    }

    function removeNote(note:NoteType) {
      setNotes(notes.filter((n:NoteType) => n.id !== note.id));
    }

    function setComplete(note:NoteType){
      note.completed = !note.completed;
      setNotes([...notes]);
    }

    function sendNote(e) {
      if(e.code && e.code !== "Enter"){
        return;
      }
      addNote(noteInput.current)
    }

    function loadNotes() {
      if(visibleNotesAmount <= notes.length) {
        // !!!По некоторым неведанным мне причинам функция проходит по много раз сразу, нужно фиксить.!!!
        // useMemo?
        setVisibleNotesAmount(visibleNotesAmount + notesPerLoad);
      }
    }

    function updateNotes(){
      setCurrentNotes(notes.slice(0, visibleNotesAmount));
    }

    function scrollHandler(){
      const scrolled = document.documentElement.clientHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;

      if(scrolled > document.documentElement.clientHeight){
        setArrow(true);
      }else{
        setArrow(false);
      }
      if(scrolled >= documentHeight) loadNotes();
    }

    document.addEventListener('scroll', scrollHandler)
    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50').then(response => setNotes(response.data));
      window.scrollTo(0, 0); // По каким то причинам не работает. После обновления страницы она немного сдвинута вниз.
      return () => {
        document.removeEventListener('scroll', scrollHandler);
      }
    }, [])

    useEffect(() => {
      updateNotes();
    }, [notes, visibleNotesAmount])

    return (
      <div className={styles.root}>
        {arrow && <Arrow close={() => {
          setArrow(false);
          window.scrollTo(0, 0);
        }}/>}
        <Modal
          visible={modal}
          onClose={() => setModal(false)}
        >
          {modal && noteInput.current.blur()}
          <span>{modalMsg}</span>
        </Modal>
        <div className={styles.headText}>
          <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
          <input
            ref={noteInput}
            type="text"
            maxLength="50"
            placeholder='Enter...'
            className={styles.inputEnter}
            onKeyDown={(e) => {sendNote(e)}}
          />
          <div className={styles.buttons}>
            <img src="src/images/plus.png" alt="plus.png" className={`UIButton ${styles.add}`} onClick={(e) => {sendNote(e)}}/>
            <img src="src/images/bin.png" alt="bin.png" className={`UIButton ${styles.clear}`} onClick={() => setNotes([])}/>
          </div>
        </div>
        <NotesList removeNote={removeNote} setComplete={setComplete} notes={currentNotes}/>
        <div className={styles.moreBtn}>
          <button onClick={(e:any) => {
            loadNotes();
            e.target.blur();
          }}>MORE NOTES</button>
        </div>
      </div>
    )
  }

  export default Notes;


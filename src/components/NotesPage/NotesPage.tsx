import React, {useEffect, useState} from 'react';
import styles from './NotesPage.module.css';
import Modal from '../Modal/Modal'
import {NoteType} from '../../types/note';
import NotesList from '../NotesList/NotesList';
import Arrow from '../Arrow/Arrow';
import {useScroll} from "../../hooks/useScroll";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalState} from "../../types/modal";
import {useActions} from "../../hooks/useActions";
import {NOTES_PER_LOAD} from "../../config/notes";
import NotesState from "../NotesState/NotesState";
import NotesPageInput from "../NotesPageInput/NotesPageInput";
import MoreNotesButton from "../MoreNotesButton/MoreNotesButton";

const NotesPage: React.FC = () => {
  const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(NOTES_PER_LOAD);
  const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);
  const modal: ModalState = useTypedSelector(state => state.modal)

  const notes = useTypedSelector(state => state.notes)
  const {fetchNotes, setArrow} = useActions();

  function updateNotes() {
    setCurrentNotes(notes.notes.slice(0, visibleNotesAmount));
  }

  function loadNotes() {
    if(visibleNotesAmount <= notes.notes.length) {
      setVisibleNotesAmount(visibleNotesAmount + NOTES_PER_LOAD);
    }
  }

  //Чтобы при первом скролле вернуться в начало страницы, т.к. при первом скролле высота документа не увеличивается (некуда скроллить).
  // if(visibleNotesAmount == NOTES_PER_LOAD * 2) window.scrollTo(0, 0);

  useEffect(() => {
    updateNotes();
    document.addEventListener('scroll', useScroll.bind(this, {setArrow, loadNotes}));
    return () => {
      document.removeEventListener('scroll', useScroll.bind(this, {setArrow, loadNotes}));
    }
  }, [notes, visibleNotesAmount])

  useEffect(() => {
     fetchNotes([]);
  }, [])

  return (
      <div className={styles.root}>
        <div className={styles.headText}>
          <h1>TO-DO LIST</h1>
        </div>
        <Arrow />
        <Modal visible={modal.visible}>
          <span>{modal.message}</span>
        </Modal>
        <NotesPageInput/>
        <NotesState/>
        <NotesList notes={currentNotes}/>
        {/*Временно отключил, пока не разберусь как правильно фетчить доп. нотесы.*/}
        {/*<MoreNotesButton/>*/}
      </div>
  )
}

export default NotesPage;


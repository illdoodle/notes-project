import React, {useEffect} from 'react';
import styles from './NotesPage.module.css';
import Modal from '../Modal/Modal'
import Arrow from '../Arrow/Arrow';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalState} from "../../types/modal";
import {useActions} from "../../hooks/useActions";
import NotesLoadingState from "../NotesLoadingState/NotesLoadingState";
import NoteInput from "../NoteInput/NoteInput";
import MoreNotesButton from "../MoreNotesButton/MoreNotesButton";
import NotesPagination from "../NotesPagination/NotesPagination";

const NotesPage: React.FC = () => {
  const modal: ModalState = useTypedSelector(state => state.modal)
  const {fetchNotes} = useActions();

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
        <NoteInput/>
        <NotesLoadingState/>
        <NotesPagination/>
        <MoreNotesButton/>
      </div>
  )
}

export default NotesPage;


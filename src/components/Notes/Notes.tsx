import React, {createRef, useEffect, useRef, useState, MutableRefObject, ReactNode} from 'react';
import styles from './Notes.module.css';
import Modal from '../Modal/Modal'
import {NoteType} from '../../types/note';
import NotesList from '../NotesList/NotesList';
import Arrow from '../Arrow/Arrow';
import {useScroll} from "../../hooks/useScroll";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalState} from "../../types/modal";
import {useActions} from "../../hooks/useActions";

//TODO Указать что это страничный компонент Notes.tsx -> NotesPage.tsx
const Notes: React.FC = () => {
  //TODO Создать папку src/config и вынести туда это значение,
  // все константы должны быть написаны в формате UPPER_CAMEL_CASE
  const notesPerLoad: number = 10;
  //TODO вынести в отдельный компонент отвечающий за отображение задач.
  const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(notesPerLoad);
  const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);

  //TODO вынести в отдельный компонент отвечающий за добавление задачи
  const noteInput: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [modalMsg, setModalMsg] = useState <string>('');
  const modal: ModalState = useTypedSelector(state => state.modal)

  const notes = useTypedSelector(state => state.notes)
  const {fetchNotes, setNotes, setArrow, setModal} = useActions();

  //TODO вынести в отдельный компонент отвечающий за добавление задачи
  function addNote(title: string) {
    if(!title.trim()) {
      setModalMsg('Введите данные.');
      setModal(true);
      return;
    }

    //TODO Реализовать это как метод addNotes в redux-store
    setNotes([
      {
        id: Date.now(),
        title,
        completed: false,
        userId: 1,
        noteRef: createRef(),
      },
      ...(notes.notes),
    ]);
    noteInput.current.value = '';
  }

  function updateNotes() {
    setCurrentNotes(notes.notes.slice(0, visibleNotesAmount));
  }

  function loadNotes() {
    if(visibleNotesAmount <= notes.notes.length) {
      setVisibleNotesAmount(visibleNotesAmount + notesPerLoad);
    }
  }

  function scrollHandler() {
    const scrollData = useScroll();
    if(scrollData.scrolled > document.documentElement.clientHeight) {
      setArrow(true);
    } else {
      setArrow(false);
    }

    if(scrollData.scrolled >= scrollData.documentHeight) {
      loadNotes();
    }
  }

  function blurNoteInput(): ReactNode {
    noteInput.current.blur();
    return <></>;
  }

  //Чтобы при первом скролле вернуться в начало страницы, т.к. при первом скролле высота документа не увеличивается (некуда скроллить).
  if(visibleNotesAmount == notesPerLoad * 2) window.scrollTo(0, 0);

  useEffect(() => {
    updateNotes();
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [notes, visibleNotesAmount])

  useEffect(() => {
     fetchNotes();
  }, [])

  //TODO такой логики быть не должно, если задачи не пришли
  // либо выбрасывать ошибку, либо обрабатывать ситуаицю когда нет задач,
  // например выводить отдельный компонент который будет выводить сообщение
  // об отсутствии задач и предлагать создать первую задачу
  useEffect(() => {
    if (notes.notes.length > 0) {
      setNotes(notes.notes);
    }
  }, [notes.loading])

  if (notes.loading) return <h1>Идёт загрузка...</h1>;
  if (notes.error) return <h1>Ошибка: {notes.error}</h1>;

  return (
      <div className={styles.root}>
        <Arrow />
        {/* TODO Code Styling <Modal visible={modal.visible}> */}
        <Modal
            visible={modal.visible}
        >
          {modal.visible && blurNoteInput()}
          <span>{modalMsg}</span>
        </Modal>
        <div className={styles.headText}>
          <h1>TO-DO LIST</h1>
        </div>
        <div className={styles.input}>
          {/* TODO Не использовать аннонимные функции в TSX. Input реализовать отдельным компонентом. */}
          <input
              ref={noteInput}
              type='text'
              maxLength={50}
              placeholder='Enter...'
              className={styles.inputEnter}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {e.code == 'Enter' ? addNote(noteInput.current.value) : null}}
          />
          <div className={styles.buttons}>
            {/* TODO При использовании ссылок на картинки, картинки должны находится в папке notes-project/public/images */}
            {/* TODO Не использовать аннонимные функции в TSX. Кнопку реализовать отдельным компонентом. */}
            <img src='src/components/images/plus.svg' alt='plus.png' className={`UIButton ${styles.add}`} onClick={() => {addNote(noteInput.current.value)}}/>
            {/* TODO Не использовать аннонимные функции в TSX. Кнопку реализовать отдельным компонентом. */}
            <img src='src/components/images/bin.svg' alt='bin.png' className={`UIButton ${styles.clear}`} onClick={() => setNotes([])}/>
          </div>
        </div>
        <NotesList notes={currentNotes}/>
        <div className={styles.moreBtn}>
          {/* TODO Не использовать аннонимные функции в TSX. Кнопку реализовать отдельным компонентом. */}
          <button onClick={(e:any) => {
            loadNotes();
            e.target.blur();
          }}>MORE NOTES</button>
        </div>
      </div>
  )
}

export default Notes;


import React, {useEffect, useState} from 'react';
import {NOTES_PER_LOAD} from "../../config/notes";
import {NotesState, NoteType} from "../../types/note";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {useScroll} from "../../hooks/useScroll";
import NotesList from "../NotesList/NotesList";

const NotesPagination: React.FC = () => {
    const [visibleNotesAmount, setVisibleNotesAmount] = useState <number>(NOTES_PER_LOAD);
    const [currentNotes, setCurrentNotes] = useState <NoteType[]>([]);
    const notes: NotesState = useTypedSelector(state => state.notes)
    const {setArrow} = useActions();

    //Другой вариант пагинации - через redux, или выводить NoteList n-ое количество раз в зависимости от количества отображаемых заметок.

    //Чтобы при первом скролле вернуться в начало страницы, т.к. при первом скролле высота документа не увеличивается (некуда скроллить).
    if(visibleNotesAmount == NOTES_PER_LOAD * 2) window.scrollTo(0, 0);

    function updateNotes() {
        setCurrentNotes(notes.notes.slice(0, visibleNotesAmount));
    }

    function loadNotes() {
        if(visibleNotesAmount <= notes.notes.length) {
            setVisibleNotesAmount(visibleNotesAmount + NOTES_PER_LOAD);
        }
    }

    useEffect(() => {
        updateNotes();
        document.addEventListener('scroll', useScroll.bind(this, {setArrow, loadNotes}));
        return () => {
            document.removeEventListener('scroll', useScroll.bind(this, {setArrow, loadNotes}));
        }
    }, [notes, visibleNotesAmount])
    return (
        <NotesList notes={currentNotes}/>
    );
};

export default NotesPagination;
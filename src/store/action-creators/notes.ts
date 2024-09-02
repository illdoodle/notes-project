// noinspection JSUnusedGlobalSymbols

import {Dispatch} from "redux";
import axios, {AxiosResponse} from "axios";
import {NotesAction, notesActionType, NoteType} from "../../types/note";

export const fetchNotes = (oldNotes: NoteType[]) => {
    return async (dispatch: Dispatch<NotesAction>) => {
        try{
            dispatch({type: notesActionType.FETCH_NOTES});
            const response: AxiosResponse<NoteType[]> = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50');
            const newData = response.data.map((note: NoteType) =>{
                return {
                    id: Math.round(Math.random() * 1000000),
                    title: note.title,
                    completed: note.completed,
                    noteRef: null,
                }
            })
            dispatch({type: notesActionType.FETCH_NOTES_SUCCESS, payload: [...oldNotes, ...newData]});
        } catch (e) {
            dispatch({type: notesActionType.FETCH_NOTES_ERROR, payload: e.message});
        }
    }
}

export const setNotes = (notes): NotesAction => {
    return {type: notesActionType.SET_NOTES, payload: notes};
}
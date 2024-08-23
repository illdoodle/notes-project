// noinspection JSUnusedGlobalSymbols

import {Dispatch} from "redux";
import axios, {AxiosResponse} from "axios";
import {NotesAction, notesActionType, NoteType} from "../../types/note";

export const fetchNotes = () => {
    return async (dispatch: Dispatch<NotesAction>) => {
        try{
            dispatch({type: notesActionType.FETCH_NOTES});
            const response: AxiosResponse<NoteType[]> = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50');
            dispatch({type: notesActionType.FETCH_NOTES_SUCCESS, payload: response.data});
        } catch (e) {
            dispatch({type: notesActionType.FETCH_NOTES_ERROR, payload: e.message});
        }
    }
}
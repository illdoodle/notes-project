import {RefObject} from "react";

export type NotesState = {
    notes: NoteType[],
    loading: boolean,
    error: null | string,
}

export type NoteType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
    noteRef: RefObject<HTMLElement>,
}

export enum notesActionType {
    FETCH_NOTES = 'FETCH_NOTES',
    FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS',
    FETCH_NOTES_ERROR = 'FETCH_NOTES_ERROR',
}

type FetchNotesAction = {
    type: notesActionType.FETCH_NOTES,
}
type FetchNotesActionSuccess = {
    type: notesActionType.FETCH_NOTES_SUCCESS,
    payload: NoteType[],
}
type FetchNotesActionError = {
    type: notesActionType.FETCH_NOTES_ERROR,
    payload: string,
}

export type NotesAction = FetchNotesAction | FetchNotesActionSuccess | FetchNotesActionError;

import {NotesAction, notesActionType, NotesState} from "../../types/note";

const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null,
}

export const notesReducer = (state: NotesState = initialState, action: NotesAction): NotesState => {
    switch (action.type) {
        case notesActionType.FETCH_NOTES:
            return {...state, loading: true};
        case notesActionType.FETCH_NOTES_SUCCESS:
            return {...state, loading: false, notes: action.payload};
        case notesActionType.FETCH_NOTES_ERROR:
            return {...state, loading: false, error: action.payload};
        case notesActionType.SET_NOTES:
            return {...state, notes: action.payload};
        default:
            return state;
    }
}
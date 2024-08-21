import {ModalAction, ModalActionTypes, ModalState} from "../../types/modal";

const initialState: ModalState = {
    visible: false,
}

export const modalReducer = (state: ModalState = initialState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalActionTypes.SET_MODAL:
            return {...state, visible: action.payload,};
        default:
            return state;
    }
}
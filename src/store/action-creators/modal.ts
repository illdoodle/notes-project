// noinspection JSUnusedGlobalSymbols

import {ModalAction, ModalActionTypes, ModalState} from "../../types/modal";

export const setModal = (modalState: ModalState): ModalAction => {
    return {type: ModalActionTypes.SET_MODAL, payload: modalState};
}
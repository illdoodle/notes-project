// noinspection JSUnusedGlobalSymbols

import {ModalAction, ModalActionTypes} from "../../types/modal";

export const setModal = (modalState): ModalAction => {
    return {type: ModalActionTypes.SET_MODAL, payload: modalState};
}
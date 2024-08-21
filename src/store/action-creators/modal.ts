// noinspection JSUnusedGlobalSymbols

import {ModalActionTypes} from "../../types/modal";

export const setModal = (modalState) => {
    return {type: ModalActionTypes.SET_MODAL, payload: modalState};
}
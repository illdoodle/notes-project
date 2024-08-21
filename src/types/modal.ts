export type ModalState = {
    visible: boolean,
}

export enum ModalActionTypes {
    SET_MODAL = 'SET_MODAL',
}

export type ModalAction = {
    type: ModalActionTypes.SET_MODAL;
    payload: boolean,
}



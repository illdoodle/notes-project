export type ArrowState = {
    visible: boolean,
}

export enum ArrowActionTypes {
    SET_ARROW = 'SET_ARROW',
}

export type ArrowAction = {
    type: ArrowActionTypes.SET_ARROW;
    payload: boolean,
}
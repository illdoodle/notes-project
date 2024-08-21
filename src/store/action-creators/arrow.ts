// noinspection JSUnusedGlobalSymbols

import {ArrowActionTypes} from "../../types/arrow";

export const setArrow = (arrowState: boolean) => {
    return {type: ArrowActionTypes.SET_ARROW, payload: arrowState};
}
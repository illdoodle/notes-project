// noinspection JSUnusedGlobalSymbols

import {ArrowActionTypes} from "../../types/arrow";

export const setArrow = (arrowState) => {
    return {type: ArrowActionTypes.SET_ARROW, payload: arrowState};
}
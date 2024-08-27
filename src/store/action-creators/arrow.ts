// noinspection JSUnusedGlobalSymbols

import {ArrowAction, ArrowActionTypes} from "../../types/arrow";

export const setArrow = (arrowState: boolean): ArrowAction => {
    return {type: ArrowActionTypes.SET_ARROW, payload: arrowState};
}
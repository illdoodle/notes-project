import {ArrowAction, ArrowActionTypes, ArrowState} from "../../types/arrow";

const initialState: ArrowState = {
    visible: false,
}

export const arrowReducer = (state: ArrowState = initialState, action: ArrowAction): ArrowState => {
    switch (action.type) {
        case ArrowActionTypes.SET_ARROW:
            return {...state, visible: action.payload,};
        default:
            return state;
    }
}
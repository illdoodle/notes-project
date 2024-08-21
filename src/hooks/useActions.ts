import {useDispatch} from "react-redux";
import {ActionCreator, bindActionCreators, Dispatch} from "redux";
import {ArrowAction} from "../types/arrow";
import {ModalAction} from "../types/modal";
import ActionCreators from "../store/action-creators/actionCreators";

export const useActions = () => {
    const dispatch: Dispatch = useDispatch();
    return bindActionCreators(ActionCreators as ActionCreator<Actions>, dispatch);
}

type Actions =
    ArrowAction |
    ModalAction;
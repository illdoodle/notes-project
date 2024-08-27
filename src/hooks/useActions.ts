import {useDispatch} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import ActionCreators from "../store/action-creators/actionCreators";

export const useActions = () => {
    const dispatch: Dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
}


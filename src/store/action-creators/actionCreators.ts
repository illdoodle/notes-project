import * as ArrowActionCreators from './arrow';
import * as ModalActionCreators from './modal'
import * as NoteActionCreators from './notes';

export default {
    ...ArrowActionCreators,
    ...ModalActionCreators,
    ...NoteActionCreators,
}
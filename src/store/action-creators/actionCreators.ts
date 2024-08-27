import * as ArrowActionCreators from './arrow';
import * as ModalActionCreators from './modal'
import * as NoteActionCreators from './notes';

//TODO При необходимости только одно из action, всё равно будут загружены все, оптмизировать
export default {
    ...ArrowActionCreators,
    ...ModalActionCreators,
    ...NoteActionCreators,
}
import {RefObject} from "react";

export type NoteType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
    noteRef: RefObject<HTMLElement>,
}

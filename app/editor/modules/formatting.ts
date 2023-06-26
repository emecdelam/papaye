/*

This module is in charge of formatting text. 
Like bold, italics, underlined, monospace, and (latex ?)

*/

import { KeyboardEvent } from "react";
import { Editor } from "slate";

export const FormattingModule = {

    isMarked(editor: Editor, markName) {
        const marks = Editor.marks(editor)
        return marks ? marks[markName] || false : false
    },

    toogleMark(editor: Editor, markName: string){
        if (FormattingModule.isMarked(editor,markName)) {
            Editor.removeMark(editor,markName)
        } else {
            Editor.addMark(editor, markName, true)
        }
    },

    handleKeyDown(editor: Editor, event: KeyboardEvent) {
        //Am i pressing Ctrl+Key
        if (event.ctrlKey) {
            if (event.key == "b") {
                event.preventDefault()
                FormattingModule.toogleMark(editor, "bold")
            }
            if (event.key == "i") {
                event.preventDefault()
                FormattingModule.toogleMark(editor, "italic")
            }
            if (event.key == "u") {
                event.preventDefault()
                FormattingModule.toogleMark(editor, "underline")
            }
        }
    }
}
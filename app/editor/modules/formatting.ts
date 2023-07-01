/*

This module is in charge of formatting text. 
Like bold, italics, underlined

*/

import { KeyboardEvent } from "react";
import { Editor } from "slate";
import { ComboHandler, EditorUtils } from "./utils";

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
        if (event.shiftKey) {
            if (event.key == "Enter") {
                event.preventDefault()
                editor.insertFragment([{text:"\n"}])
            }
        }
    },
    handleCombos(editor: Editor) {
        //italic
        if (ComboHandler.isComboPressed(/[^\*]\*[^ \*][^\*\n]*[^ \*]\*[^\*]/)) {
            let matchLength = ComboHandler.matchValue.length;
            let offset = ComboHandler.match.index;
            EditorUtils.deleteAtOffset(editor, offset, matchLength) //removing the match
            editor.insertFragment([{text: ComboHandler.matchValue.replaceAll("*",""), italic: true}])
            Editor.removeMark(editor,"italic") //removes mark for future user typings
        }
        //bold
        if (ComboHandler.isComboPressed(/\*\*[^ ][^\*\n]+[^ ]\*\*/)) {
            let matchLength = ComboHandler.matchValue.length;
            let offset = ComboHandler.match.index;
            EditorUtils.deleteAtOffset(editor, offset, matchLength) //removing the match
            editor.insertFragment([{text: ComboHandler.matchValue.replaceAll("*",""), bold: true}])
            Editor.removeMark(editor,"bold") //removes mark for future user typings

        }
        //underlined
        if (ComboHandler.isComboPressed(/_[^_\n]+_/)) {
            let matchLength = ComboHandler.matchValue.length;
            let offset = ComboHandler.match.index;
            EditorUtils.deleteAtOffset(editor, offset, matchLength) //removing the match
            editor.insertFragment([{text: ComboHandler.matchValue.replaceAll("_",""), underline: true}])
            Editor.removeMark(editor,"underline") //removes mark for future user typings

        }
    }
}
import { KeyboardEvent } from "react"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"

export const EditorUtils =  {
    isLineBegining: (editor: Editor, offset?: number) => {
        let position = Editor.start(editor, editor.selection)
        return (position.offset == (offset || 0))
    },
    getCaretXY: (editor: Editor): DOMRect => {
        let selection = ReactEditor.toDOMRange(editor, editor.selection)
        return selection.getBoundingClientRect()
    }
}


const BANNED = ["Alt", "Control","AltLeft","AltGraph", "ShiftLeft","ShiftRight","Tab","Backspace","Delete"]

export const ComboHandler = {
    pressed: [],
    handleKeyDown: (editor: Editor, event: KeyboardEvent) => {
        if (!BANNED.includes(event.key)) {
            ComboHandler.pressed.push(event.key)
        }
        if (event.key == "Enter") {
            ComboHandler.pressed = []
        }
        if (event.key == "Backspace") {
            ComboHandler.pressed.splice(-1,1)
        }
        console.log(ComboHandler.pressed)
    },
    isComboPressed: (combo: string) => {
        if (ComboHandler.pressed.slice(-combo.length).toString() == combo.split("").toString()){
            ComboHandler.pressed = []
            return true
        }
        return false    
    }
}
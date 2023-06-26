import { KeyboardEvent } from "react"
import { Editor } from "slate"

export const EditorUtils =  {
    isLineBegining: (editor: Editor, offset?: number) => {
        let position = Editor.start(editor, editor.selection)
        return (position.offset == (offset || 0))
    }
}

export const ComboHandler = {
    pressed: [],
    handleKeyDown: (editor: Editor, event: KeyboardEvent) => {
        ComboHandler.pressed.push(event.key)
        if (event.key == "Enter") {
            ComboHandler.pressed = []
        }
    },
    isComboPressed: (combo: string) => {
        if (ComboHandler.pressed.slice(-combo.length).toString() == combo.split("").toString()){
            ComboHandler.pressed = []
            return true
        }
        return false    
    }
}
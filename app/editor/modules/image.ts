import { Editor } from "slate";

export const useImage = (editor: Editor) => {
    const {isVoid} = editor
    // Adding math as an inline element !
    editor.isVoid= element => {
        return element.type === "image" ? true : isVoid(element)
    }
    return editor
}
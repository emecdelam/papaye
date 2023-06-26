import { Editor } from "slate";

export const useMaths = (editor: Editor) => {
    const {isInline} = editor
    // Adding math as an inline element !
    editor.isInline = element => {
        return element.type === "math" ? true : isInline(element)
    }
    return editor
}
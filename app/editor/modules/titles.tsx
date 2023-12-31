import { KeyboardEvent } from "react";
import { Editor } from "slate";
import { Transforms , Element, Text } from 'slate'
import { ComboHandler, EditorUtils } from "./utils";
export const TitleModule = {
    setParagraph(editor: Editor, level: number, keepTitle?: boolean){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'title',
      })
      // Toggle the block type depending on whether there's already a match.
      Transforms.setNodes(
        editor,
        { type: (match && !keepTitle ? 'paragraph' : 'title'),level},
        { match: n => Element.isElement(n) && Editor.isBlock(editor, n)}
      )
      Transforms.setNodes(
        editor,
        { bold: true },
        {
          //Current node
          at: Editor.parent(editor,editor.selection)[1],
          // This only matches text nodes
          match: (node) => Text.isText(node),
        }
      )
    },
    handleKeyDown(editor:Editor, event:KeyboardEvent){
        if (event.ctrlKey && event.key == 'h'){
            event.preventDefault()
            TitleModule.setParagraph(editor, 3)
        }
    },
    handleMarkdownAbreviation(editor: Editor) {
      if (ComboHandler.isComboPressed(/#{1,5} /) && EditorUtils.isLineBegining(editor, ComboHandler.matchValue.length)) {
        Transforms.delete(editor, {
          at: editor.selection,
          distance: ComboHandler.matchValue.length,
          reverse: true
        })
        TitleModule.setParagraph(editor, ComboHandler.matchValue.length, true)
        
      }
      
    }
}
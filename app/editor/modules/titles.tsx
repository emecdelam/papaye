import { KeyboardEvent } from "react";
import { Editor } from "slate";
import { Transforms , Element, Text } from 'slate'
export const TitleModule = {
    handleKeyDown(editor:Editor, event:KeyboardEvent){
        if (event.ctrlKey && event.key == 'h'){
            event.preventDefault()
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'title',
              })
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: (match ? 'paragraph' : 'title'),level:(3)},
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n)}
              )
              Transforms.setNodes(
                editor,
                { bold: true },
                {
                  //Current node
                  at: Editor.parent(editor,editor.selection)[1],
                  // This only matches text nodes
                  match: (node, path) => Text.isText(node),
                }
              )
        }
    }
}
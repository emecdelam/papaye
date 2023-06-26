
import { useCallback, useState } from "react"
import { Transforms, createEditor, Editor, Element, Text } from "slate"
import {withReact, Slate, Editable} from "slate-react"
import { renderElement, renderLeaf } from "./renderers"
import { FormattingModule } from "./modules/formatting"

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{text:" gras", bold:true}]
    }
]


export default function EditorComponent() {
    const [editor] = useState(() => withReact(createEditor()))
    const renderElementCallback = useCallback(props => renderElement(props), [])
    const renderLeafCallback = useCallback(props => renderLeaf(props), [])
    return (<>
    
        <p>Hey im the editor</p>
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={renderElementCallback} renderLeaf={renderLeafCallback} onKeyDown={event => {
                //Handles italic, bold, underline.
                FormattingModule.handleKeyDown(editor, event)

                if (event.ctrlKey && event.key == 'h'){
                    event.preventDefault()
                    const [match] = Editor.nodes(editor, {
                        match: n => n.type === 'title',
                      })
                      // Toggle the block type depending on whether there's already a match.
                      Transforms.setNodes(
                        editor,
                        { type: match ? 'paragraph' : 'title' },
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
            }}/>
        </Slate>
    
    </>)
}


// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'


type CustomElement = { type: 'paragraph' | 'code' | 'title', children: CustomText[] }
type CustomText = { text: string}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
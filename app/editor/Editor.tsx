
import { useCallback, useState } from "react"
import { Transforms, createEditor, Editor, Element, Text } from "slate"
import {withReact, Slate, Editable} from "slate-react"
import { renderElement, renderLeaf } from "./renderers"
import { FormattingModule } from "./modules/formatting"
import { TitleModule } from "./modules/titles"
import { useMaths } from "./modules/math"
const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            {
                text:"Some text "
            }, 
            { 
                type: "math",
                children: [
                    {
                        text:"x^2"
                    }
                ],
            }, 
            {
                text:" end of paragraph"
            }
        ]
    }
]


export default function EditorComponent() {
    const [editor] = useState(() => withReact(useMaths(createEditor())))
    const renderElementCallback = useCallback(props => renderElement(props), [])
    const renderLeafCallback = useCallback(props => renderLeaf(props), [])
    return (<>
    
        <p>Hey im the editor</p>
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={renderElementCallback} renderLeaf={renderLeafCallback} onKeyDown={event => {
                //Handles italic, bold, underline.
                FormattingModule.handleKeyDown(editor, event)
                //Handle titles
                TitleModule.handleKeyDown(editor,event)

            }}/>
        </Slate>
    
    </>)
}


// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'


type CustomElement = { type: 'paragraph' | 'code' | 'title' | 'math', children: CustomText[] }
type CustomText = { text: string} | {type: 'math', children: CustomText[]}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
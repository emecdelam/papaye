
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
        children: [{text:" Great paragraph with maths "}, {type:"math", children: [{text:"x^2"}]}, {text:" inside !"}],
    },
]

export default function EditorComponent() {
    const [editor] = useState(() => withReact(useMaths(useImage(createEditor()))))
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

                //Handle utility to be able to match keystrokes combo
                ComboHandler.handleKeyDown(editor, event)

                //Titles from markdown combos
                TitleModule.handleMarkdownAbreviation(editor)
                
                //New paragraph
                if (event.key === 'Enter') {
                    event.preventDefault()
                    Transforms.insertNodes(
                        editor,
                        {
                            type:'paragraph',
                            children: [{text:''}]
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
import { useImage } from "./modules/image"
import { ComboHandler } from "./modules/utils"


type CustomElement = { type: 'paragraph' | 'code' | 'title' | 'math', children: CustomText[] }
type CustomText = { text: string} | {type: 'math', children: CustomText[]}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}


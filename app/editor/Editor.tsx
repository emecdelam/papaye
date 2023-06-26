
import { useState } from "react"
import { createEditor } from "slate"
import {withReact, Slate, Editable} from "slate-react"


const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [{text: "Hey im a super paragraph"}]
    }
]

export default function Editor() {
    const [editor] = useState(() => withReact(createEditor()))
    

    return (<>
    
        <p>Hey im the editor</p>
        <Slate editor={editor} initialValue={initialValue}>
            <Editable/>
        </Slate>
    
    </>)
}


// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph', children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

import { useCallback, useState } from "react"
import { Transforms, createEditor, Editor, Element } from "slate"
import {withReact, Slate, Editable} from "slate-react"


const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{text: "Hey im a super paragraph"}]
    }
]

const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export default function EditorComponent() {
    const [editor] = useState(() => withReact(createEditor()))
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props}/>
            default:
                return <DefaultElement {...props}/>
        }
    }, [])

    return (<>
    
        <p>Hey im the editor</p>
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={renderElement} onKeyDown={event => {
                console.log(event.key)
                if (event.key == "µ" && event.ctrlKey) {
                    event.preventDefault() 
                    const [match] = Editor.nodes(editor, {
                        match: n => n.type === "code"
                    })
                    Transforms.setNodes(
                        editor,
                        {type: match ? 'paragraph' : 'code'},
                        {match: n => Element.isElement(n) && Editor.isBlock(editor, n)}
                    )
                }
            }}/>
        </Slate>
    
    </>)
}


// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph' | 'code', children: CustomText[] }
type CustomText = { text: string}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
    Node: CustomElement | CustomText
  }
}
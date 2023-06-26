import CodeElement from "./elements/Code"
import Math from "./elements/Math"
import Paragraph from "./elements/Paragraph"
import Title from "./elements/Title"
import DefaultLeaf from "./leafs/leaf"

export function renderElement(props) {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props}/>
        case 'math':
            return <Math {...props}/>
        case 'title':
            return <Title {...props}/>
        default:
            return <Paragraph {...props}/>
    }

}

export function renderLeaf(props) {
    return <DefaultLeaf {...props}/>
}
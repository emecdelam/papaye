import CodeElement from "./elements/Code"
import Paragraph from "./elements/Paragraph"
import Title from "./elements/Title"
import DefaultLeaf from "./leafs/leaf"

export function renderElement(props) {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props}/>
        case 'title':
            return <Title {...props}/>
        default:
            return <Paragraph {...props}/>
    }

}

export function renderLeaf(props) {
    return <DefaultLeaf {...props}/>
}
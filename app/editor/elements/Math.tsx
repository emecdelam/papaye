import { useEffect, useRef, useState } from "react"
import { Node } from "slate"
import katex from "katex"
import { useSelected } from "slate-react"
export default function Math(props) {
    const slateSelected = useSelected();
    const [focus, setFocus] = useState(false);
    const [mathString, setMathString] = useState("")
    useEffect(() => {
        setFocus(slateSelected)
    }, [slateSelected])

    useEffect(() => {
        setMathString(katex.renderToString(Node.string(props.element), {output: "mathml"}))
    }, [slateSelected])

    if (focus || slateSelected) {
        return <span {...props.attributes}>{props.children}</span>
    }

  

    return (
        <span contentEditable={false} onClick={() => {
            setFocus(true)
        }} dangerouslySetInnerHTML={{__html: mathString}}></span>
    )
}
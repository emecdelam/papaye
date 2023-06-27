import { Node } from "slate"

type Section = {
    level: number,
    title: string,
    element: Node,
    subSections: Section[]
}

interface TocProps {
    toc: Section[]
}



const List = (props: TocProps) => {
    return (
        <>
            {props.toc.map(x => <>
                <p style={{paddingLeft: x.level*10+"px"}}>{x.title}</p>
                {x.subSections.length > 0 ? <List toc={x.subSections}/>: <></>}
            </>)}
        </>
    )   
}

export default function TableOfContent(props: TocProps) {
    return (
        <div className="h-full w-72 flex-shrink-0">
            <List toc={props.toc}/>
        </div> 
    )
}
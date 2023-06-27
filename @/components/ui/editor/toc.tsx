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
                <p style={{fontSize: (1.225 - 0.07*(x.level-1))+"rem", paddingLeft: (x.level-1)*10+"px", fontWeight: ((x.level+1) % 2 == 0 ? 'bold': 'regular')}}>{x.title}</p>
                {x.subSections.length > 0 ? <List toc={x.subSections}/>: <></>}
            </>)}
        </>
    )   
}

export default function TableOfContent(props: TocProps) {
    return (
        <div className="h-full w-72 flex-shrink-0">
            <p className="text-center uppercase font-bold text-lg text-gray-400">Table des matières</p>
            <List toc={props.toc}/>
        </div> 
    )
}
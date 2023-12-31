export default function Title(props) {
    switch (props.element.level){
        case 1:
            return <h1 className="text-5xl mb-2" {...props.attributes}>
                {props.children}
            </h1>
        case 2:
            return <h2 className="text-4xl mb-2" {...props.attributes}>
                {props.children}
            </h2>
        case 3:
            return <h3 className="text-3xl mb-2" {...props.attributes}>
                {props.children}
            </h3>
        case 4:
            return <h4 className="text-2xl mb-2" {...props.attributes}>
                {props.children}
            </h4>
        case 5:
            return <h5 className="text-xl mb-2" {...props.attributes}>
                {props.children}
            </h5>
    }

}
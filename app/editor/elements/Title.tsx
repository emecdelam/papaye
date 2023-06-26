export default function Title(props) {
    return <h1 className="text-2xl" {...props.attributes}>
        {props.children}
    </h1>
}
export default function DefaultLeaf(props) {
    return <span {...props.attributes} style={
        {
            fontWeight: props.leaf.bold ? 'bold' : 'normal',
            fontStyle: props.leaf.italic ? "italic" : 'inherit',
            textDecoration: props.leaf.underline ? "underline": ""
        
        }}>
        {props.children}
    </span>
}
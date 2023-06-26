export default function Paragraph(props) {
    return <p {...props.attributes}>
        {props.children}
    </p>
}
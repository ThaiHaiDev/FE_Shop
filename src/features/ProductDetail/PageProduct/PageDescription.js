import DOMPurify from 'dompurify'

export default function PageDescription({ product }) {
    const safeDescription = DOMPurify.sanitize(product.description)
    return (
        <div style={{padding: '15px 20px'}} dangerouslySetInnerHTML={{__html: safeDescription}} />
    )
}
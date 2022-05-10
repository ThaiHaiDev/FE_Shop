import { useEffect, useState } from "react"
import productApi from "../../api/productApi"

export default function useProductDetail(productId) {
    const [loading, setLoading] = useState(true)
    const [productDetailById, setProductDetailById] = useState({})

    useEffect(() => {
        // Lưu ý phải cho () để hàm async chạy ngay để không lỗi
        (async () => {
            try {
                setLoading(true)
                const data = await productApi.getById(productId)
                setProductDetailById(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        })()
    }, [productId])

    return {
        loading,
        productDetailById
    }
}
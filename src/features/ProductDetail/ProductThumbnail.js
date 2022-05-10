import { Box } from "@mui/material"

export default function ProductThumbnail({ product }) {
    const thumbnailUrl = product.thumbnail ? `https://api.ezfrontend.com${product.thumbnail?.url}` : "https://via.placeholder.com/444"

    return (
        <Box>
            <img src={thumbnailUrl} alt={product.name} width="100%" />
        </Box>
    )
}
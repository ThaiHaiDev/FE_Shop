import { Box, Typography } from "@mui/material";

export default function ProductInfo({ product }) {
    return (
        <Box sx={{borderBottom: '1px solid gray', paddingBottom: '8px'}}>
            <Typography component="h1" variant="h4" sx={{padding: '5px 10px'}}>{product.name}</Typography>
            <Typography variant="body2" sx={{padding: '0 10px', paddingBottom: '15px'}}>{product.shortDescription}</Typography>

            <Box sx={{backgroundColor: '#eeeeee', padding: '10px', margin: '8px'}}>
                <Box component="span" sx={{fontSize: '20px', fontWeight:"bold", marginRight: '10px'}}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(product.salePrice)}
                </Box>
                <Box component="span" sx={{marginRight: '5px', textDecoration: 'line-through'}}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(product.originalPrice)}
                </Box>
                <Box component="span" sx={{}}>-{product.promotionPercent}%</Box>
            </Box>
        </Box>
    )
}
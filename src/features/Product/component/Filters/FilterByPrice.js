import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FilterByPrice({ filters = {}, onChange }) {
    const [filterPrice, setFilterPrice] = useState({
        
    })
   
    const handlePriceClick = () => {
        if (onChange) {
            onChange(filterPrice)
            filterPrice.salePrice_gte = ''
            filterPrice.salePrice_lte = ''
        }
        
    }

    const handlePriceGteChange = (e) => {
        const { name ,value } = e.target
        setFilterPrice(prev => ({
            ...prev,
            [name]: value
        }))
        
    }

    return (
        <div>
            <Typography variant='subtitle2' sx={{fontWeight: 'bold', paddingLeft: '10px', paddingTop: '10px'}}>Chọn Khoảng Giá </Typography>
            <Box display='flex'>
                <TextField name="salePrice_gte" value={filterPrice.salePrice_gte ? filterPrice.salePrice_gte : '' } onChange={handlePriceGteChange} 
                    size="small" sx={{ padding: '5px'}} />
                <TextField name="salePrice_lte" value={filterPrice.salePrice_lte ? filterPrice.salePrice_lte : '' } onChange={handlePriceGteChange} 
                    size="small" sx={{ padding: '5px'}} />
            </Box>
            <Button variant="outlined" onClick={handlePriceClick} sx={{ color: 'green', textTransform: 'none', padding: '3px 15px', margin: '5px', marginLeft: '5px', fontSize: '12px' }}>Áp dụng</Button>
            
        </div>
    )
}
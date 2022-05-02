import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FilterByService({ filters = {}, onChange }) {
    const [filterPrice, setFilterPrice] = useState({
        isFreeShip: Boolean(filters['isFreeShip']),
        isPromotion: Boolean(filters['isPromotion'])
    })
   

    const handleCheckChange = (e) => {
        if(!onChange) return;

        const { name , checked } = e.target
        onChange({[name]: checked})
    }

    return (
        <div>
            <Typography variant='subtitle2' sx={{fontWeight: 'bold', paddingLeft: '10px', paddingTop: '10px'}}>DỊCH VỤ </Typography>
            {[
                {value: 'isFreeShip', label: 'Miễn phí vận chuyển'},
                {value: 'isPromotion', label: 'Có khuyến mãi'}
            ].map(service => (
                <FormControlLabel 
                    key={service.value} 
                    control={<Checkbox checked={Boolean(filters[service.value])} 
                        onChange={handleCheckChange} 
                        name={service.value} 
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />} 
                    label={service.label} />
            ))}
            
        </div>
    )
}
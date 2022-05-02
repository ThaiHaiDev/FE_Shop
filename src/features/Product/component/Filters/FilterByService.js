import { Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function FilterByService({ filters = {}, onChange }) {

    const handleCheckChange = (e) => {
        if(!onChange) return;

        const { name , checked } = e.target
        onChange({[name]: checked})
        console.log(filters.isFreeShip)
    }

    return (
        <div>
            <Typography variant='subtitle2' sx={{fontWeight: 'bold', paddingLeft: '10px', paddingTop: '10px'}}>Dịch vụ </Typography>
            {[
                {value: 'isFreeShip', label: 'Miễn phí vận chuyển'},
                {value: 'isPromotion', label: 'Có khuyến mãi'}
            ].map(service => (
                <FormControlLabel 
                    sx={{marginLeft: '5px'}}
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
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ props }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/product/${props.id}`)
    }

    const thumbnailUrl = props.thumbnail ? `https://api.ezfrontend.com${props.thumbnail?.url}` : "https://via.placeholder.com/444"
    return (
        
        <Box padding={1} onClick={handleClick} sx={{cursor: 'pointer'}}>
            <Box padding={1} minHeight="129px">
                <img src={thumbnailUrl} alt={props.name} width="100%" />
            </Box>
            <Typography variant="body2">{props.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(props.salePrice)}
                </Box>
                {props.promotionPercent > 0 ? ` - ${props.promotionPercent}%` : ''}
            </Typography>
        </Box>
    )
}
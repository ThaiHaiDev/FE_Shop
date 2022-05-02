import { Box, Chip } from "@mui/material";

const FILTER_LIST = [
    {
        id: 1,
        getLabel: 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip  ,  // Trả về true nếu có filters.isFreeShip
        isVisible: (filters) => true,
        isRemovable: false,
        onRemove: (filters) => {},
        onToggle: (filters) => {
            const newFilter = {...filters}
            if (filters.isFreeShip) {
                delete newFilter.isFreeShip
            }
            else {
                newFilter.isFreeShip = true
            }
            return newFilter
        }
    },
    {
        id: 2,
        getLabel: 'Có khuyến mãi',
        isActive: (filters) => filters.isPromotion  ,  // Trả về true nếu có filters.isFreeShip
        isVisible: (filters) => filters.isPromotion ,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = {...filters}
            delete newFilter.isPromotion
            
            return newFilter
        },
        onToggle: (filters) => {}
    },
   
]

export default function FilterView({ filters = {}, onChange = null }) {
    return (
        <Box component='ul' sx={{ display: 'flex', flexFlow: 'row wrap', marginBottom: 0 }}>
            {FILTER_LIST.filter(x => x.isVisible(filters)).map(x => (
                <li key={x.id} style={{ listStyleType: 'none', marginRight: '5px' }}>
                    <Chip 
                        label={x.getLabel} 
                        color={x.isActive(filters) ? 'primary' : 'default'} 
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            const newFilter = x.onToggle(filters)
                            onChange(newFilter)
                        } 
                        }
                        onDelete={x.isRemovable ? () => {
                            const newFilter = x.onRemove(filters)
                            onChange(newFilter)
                        } : null}
                        />
            
                </li>
                
            ))}
            
        </Box>
    )
}
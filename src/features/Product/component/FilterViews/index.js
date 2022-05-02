import { Box, Chip } from "@mui/material";

var cateName = null

const FILTER_LIST = [
    {
        id: 1,
        getLabel: filters => 'Giao hàng miễn phí',
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
        getLabel: filters => 'Có khuyến mãi',
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
    {
        id: 3,
        getLabel: filters => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: (filters) => filters.salePrice_gte &&  filters.salePrice_lte ,  // Trả về true nếu có filters.salePrice_gte &&  filters.salePrice_lte
        isVisible: (filters) => filters.salePrice_gte &&  filters.salePrice_lte ,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = {...filters}
            delete newFilter.salePrice_gte
            delete newFilter.salePrice_lte
            return newFilter
        },
        onToggle: (filters) => {}
    },
    {
        id: 4,
        getLabel: (filters, categoryList) => {
            if (categoryList) {
                cateName = categoryList[filters.category - 1].name
            }
            else {
                return cateName
            }
            return categoryList ? `${categoryList[filters.category - 1].name}` : `${cateName}`
        } ,
        isActive: (filters) => filters.category ,  // Trả về true nếu có filters.isFreeShip
        isVisible: (filters, categoryList) => filters.category ,
        isRemovable: true,
        onRemove: (filters) => {
            
            const newFilter = {...filters}
            delete newFilter.category
            
            return newFilter
        },
        onToggle: (filters) => {}
    },
   
]

export default function FilterView({ filters = {}, onChange = null, categoryList = '' }) {
    return (
        <Box component='ul' sx={{ display: 'flex', flexFlow: 'row wrap', marginBottom: 0 }}>
            {FILTER_LIST.filter(x => x.isVisible(filters, categoryList)).map(x => (
                <li key={x.id} style={{ listStyleType: 'none', marginRight: '5px' }}>
                    <Chip 
                        label={x.getLabel(filters, categoryList)} 
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
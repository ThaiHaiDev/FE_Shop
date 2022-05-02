import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import Filters from "./component/Filters";
import FilterView from "./component/FilterViews";
import ProductList from "./component/ProductList";
import ProductSkeleton from "./component/ProductSkeleton";
import ProductSort from "./component/ProductSort";

export default function Product() {
    const [danhSach, setDanhSach] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 12,
        page: 1
    })

    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:asc',
    })

    const handlePageChange = (e, page) => {
        setFilters(prev => ({
            ...prev,
            _page: page
        }))
    }

    useEffect(() => {
        // Lưu ý phải cho () để hàm async chạy ngay để không lỗi
        (async () => {
            try {
                setLoading(true)
                const { data, pagination } = await productApi.getAll(filters)
                setDanhSach(data)
                setPagination(pagination)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        })()
    }, [filters])

    const handleSortChange = (newSortValue) => {
        setFilters(prev => ({
            ...prev,
            _sort: newSortValue
        }))
    }

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }))
    }

    
    const handleViewFilter = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <Box pt={2}>
            <Container maxWidth="sl">
                <Grid container spacing={1}>
                    <Grid item sx={{ width: '250px' }}>
                    <Paper elevation={0}>
                        <Filters filters={filters} onChange={handleFilterChange} />
                    </Paper>
                    </Grid>
    
                    {/* flex: 1 1 auto (nó chiếm hết độ rộng của thằng cha) */}
                    <Grid item sx={{ flex: '1 1 0' }}>

                        <Paper elevation={0}>

                            {/* Truyền currentSort xuống con và nhận giá trị từ con lên ở onChange */}
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            <FilterView filters={filters} onChange={handleViewFilter} />

                            {loading ? <ProductSkeleton /> : <ProductList data={danhSach} />}

                            <Pagination 
                                onChange={handlePageChange} 
                                color="primary" 
                                count={Math.ceil(pagination.total / pagination.limit)} 
                                page={pagination.page}  
                                sx={{ padding: "10px 0", marginLeft: "35%" }} />

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
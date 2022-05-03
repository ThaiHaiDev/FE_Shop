import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import Filters from "./component/Filters";
import FilterView from "./component/FilterViews";
import ProductList from "./component/ProductList";
import ProductSkeleton from "./component/ProductSkeleton";
import ProductSort from "./component/ProductSort";
import queryString from 'query-string'
import categoryApi from "../../api/categoryApi";

export default function Product() {
    const [categoryList, setCategoryList] = useState('')
    const [danhSach, setDanhSach] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 12,
        page: 1
    })

    // URL defauld
    const location = useLocation()
    const queryParams = useMemo(() => {
        return queryString.parse(location.search)
    }, [location.search])
    
    const [filters, setFilters] = useState({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 12,
        _sort: queryParams._sort || 'salePrice:asc',
    })

    // Push URL
    const navigate = useNavigate()
    useEffect(() => {
        navigate({
            search: queryString.stringify(filters)
        })
        
    }, [filters, navigate])


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

    // Lấy tên category theo id của URL queryParams
    useEffect(() => {
        (async () => {
            try {
                if (!queryParams['category']) {
                    return;
                } else {
                    const list = await categoryApi.getById(
                        Number.parseInt(queryParams['category'])
                    );

                    setCategoryList(list);
                }
            } catch (error) {
                console.log('Failed to fetch category list!', error);
            }
        })();
    }, [queryParams]);


    const handleSortChange = (newSortValue) => {
        setFilters(prev => ({
            ...prev,
            _sort: newSortValue
        }))
    }

    const handleFilterChange = (newFilters, listcate) => {
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
                            <FilterView filters={filters} onChange={handleViewFilter} categoryList={categoryList} />

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
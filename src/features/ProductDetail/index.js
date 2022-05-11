import { Box, Container, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useProductDetail from "../Hooks/useProductDetail";
import AddToCartForm from "./AddToCartForm";
import ProductInfo from "./ProductInfo";
import ProductMenu from "./ProductMenu";
import ProductThumbnail from "./ProductThumbnail";
import cartSlice from '../Cart/cartSlice'
import React from "react";

export default function ProductDetail() {
    const param= useParams()
    const detail = useProductDetail(param.productId)
    const product = detail.productDetailById
    const dispatch = useDispatch()
    const a = useSelector((state) => state.cart.cartItems)
    console.log('a', a)

    if (detail.loading) return (<div>Loading</div>)

    const handleSubmit = (values) => {
        const action = cartSlice.actions.addToCart({
            id: product.id,
            product,
            quantity: Number.parseFloat(Object.values(values))
        })
        dispatch(action)
    }
    
    return (
        <Box pt={2}>
            <Container>
                    <Grid container spacing={1}>
                        <Grid item sx={{width: '500px'}}>
                            <Paper elevation={0} sx={{ padding: '10px'}}>
                                <ProductThumbnail product={product} />
                            </Paper>
                        </Grid>
                        
                        <Grid item sx={{flex: '1 1 0'}}>
                            <Paper elevation={0} sx={{height: '495px'}}>
                                <ProductInfo product={product} />
                                <AddToCartForm onSubmit={handleSubmit} />
                            </Paper>
                        </Grid>
                        
                    </Grid>

                    <Grid container sx={{marginTop: '5px'}}>
                        <Grid item sx={{width: '100%'}}>
                            <Paper elevation={0}>
                                <ProductMenu product={product}/>
                            </Paper>
                        </Grid>
                    </Grid>
                
            </Container>
        </Box>
    )
}
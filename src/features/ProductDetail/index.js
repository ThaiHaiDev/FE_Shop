import { Box, Container, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import useProductDetail from "../Hooks/useProductDetail";
import AddToCartForm from "./AddToCartForm";
import ProductInfo from "./ProductInfo";
import ProductMenu from "./ProductMenu";
import ProductThumbnail from "./ProductThumbnail";

export default function ProductDetail() {
    const param= useParams()
    const detail = useProductDetail(param.productId)
    const product = detail.productDetailById

    if (detail.loading) return (<div>Loading</div>)

    const handleSubmit = (values) => {
        console.log('Form add cart: ',values )
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
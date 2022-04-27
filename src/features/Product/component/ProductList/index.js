import { Box, Container, Grid } from "@mui/material";
import ProductItem from "../ProductItem";

export default function ProductList({ data }) {
    return (
        <Box>
            <Container>
                <Grid container>
                    {data.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductItem props={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
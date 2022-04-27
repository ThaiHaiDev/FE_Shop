import { Box, Container, Grid, Skeleton } from "@mui/material";

export default function ProductSkeleton() {
    return (
        <Box>
            <Container>
                <Grid container>
                    {Array.from(new Array(12)).map((x, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Box padding={1}>
                                <Box padding={1}>
                                    <Skeleton variant="rectangular" width="100%" height={137} />
                                </Box>
                                <Skeleton width={220}/>
                                <Skeleton width={180}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from '../../redux/selectors';
import CartItem from './CartItem';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItemsCount = useSelector(cartItemsCountSelector);

    return (
        <Box>
            <Container>
                <Typography variant='h6' style={{ padding: '25px' }}>
                    GIỎ HÀNG: {`${cartItemsCount} sản phẩm`}
                </Typography>
                {cartItems.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}
            </Container>
        </Box>
    );
};

export default Cart

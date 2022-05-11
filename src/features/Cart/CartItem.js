import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import QuantityField from '../../component/form-control/QuantityField';
import cartSlice from './cartSlice'
import { useDispatch } from "react-redux";


const CartItem = (props) => {
    const { product } = props;
    const thumbnailUrl = product.product.thumbnail ? `https://api.ezfrontend.com${product.product.thumbnail?.url}` : "https://via.placeholder.com/444"
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Nhập số lượng muốn mua!')
            .min(1, 'Số lượng ít nhất là 1!')
            .typeError('Vui lòng nhập đúng số lượng!'),
    });
    const form = useForm({
        defaultValues: {
            quantity: product.quantity,
        },
        resolver: yupResolver(schema),
    });

    const handleChangeQuantity = async (values) => {
        console.log('values', values);
        const action = cartSlice.actions.setQuantity({
            id: product.id,
            quantity: values.quantity,
        });
        dispatch(action);
    };

    const handleDeleteClick = (id) => {
        const action = cartSlice.actions.removeFromCart(id);
        dispatch(action);
    };
    return (
        <Paper elevation={0}>
            <Grid container spacing={3}>
                <Grid item>
                    <img src={thumbnailUrl} alt={product.name} width="200px" />
                </Grid>
                <Grid item sx={{width: `calc(100% - 300px)`, display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between',}}>
                    <Box sx={{width: '60%', padding: 2, fontSize: '24px'}}>
                        <Box sx={{marginBottom: 2 , color: 'rgb(0, 153, 0)', fontSize: '15px',}}>
                            {product.product.isFreeShip ? 'Bạn được miễn phí vận chuyển!' : ''}
                        </Box>
                        {product.product.name}
                        <Box onClick={() => handleDeleteClick(product.id)} sx={{marginTop: 2, color: 'rgb(13, 92, 182)', fontSize: '13px', cursor: 'pointer',}}>
                            Xóa
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between',}}>
                        <Box sx={{textAlign: 'right', marginRight: '25px'}}>
                            <Box sx={{marginTop: 4, fontSize: '20px', marginBottom: '5px', fontWeight: 'bold', display: 'inline-block',}}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(product.product.salePrice)}
                            </Box>
                            <Box>
                                {product.product.promotionPercent > 0 && (
                                    <>
                                        <Box component='span'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(product.product.originalPrice)}
                                        </Box>
                                        <Box component='span'>
                                            {` -${product.product.promotionPercent}%`}
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <form onSubmit={form.handleSubmit(handleChangeQuantity)}>
                                <QuantityField name='quantity' label='' form={form} />
                            </form>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartItem;

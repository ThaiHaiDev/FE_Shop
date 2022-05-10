import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import QuantityField from "../../component/form-control/QuantityField";

export default function AddToCartForm({ onSubmit }) {
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter your quantity.').min(1, 'Min is 1').typeError('Please enter number'),
    })

    const form = useForm({
        defaultValues: {
            quantity: '',
        },
        resolver: yupResolver(schema)
    })

    // Thêm async và await vào để đợi onSubmit xong mới làm tiếp chứ không có await là nó làm tiếp tục không cần biết oSubmit chạy xong chưa.
    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values)
        }
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box sx={{display: 'flex'}}>
                <QuantityField form={form} name="quantity" label="Quantity" />
                <Button type="submit" variant="contained" color='primary' sx={{height: '40px', marginTop: '33px'}}>Add to cart</Button>
            </Box>
        </form>
    )
}
import React from "react";
import PropTypes from 'prop-types'
import InputField from "../../../../component/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import PasswordField from "../../../../component/form-control/PasswordField";

LoginForm.propTypes = {
    onSubmit: PropTypes.func
}

function LoginForm(props) {
    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email.').email('Please email chinh xac'),
        password: yup.string().required('Please enter your password.').min(6, 'Please password min 6 character'),
    })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: ''
        },
        resolver: yupResolver(schema)
    })

    // Thêm async và await vào để đợi onSubmit xong mới làm tiếp chứ không có await là nó làm tiếp tục không cần biết oSubmit chạy xong chưa.
    const handleSubmit = async (values) => {
        const { onSubmit } = props
        if (onSubmit) {
            await onSubmit(values)
        }
        form.reset()
    }

    const { isSubmitting } = form.formState

    return (

        <div style={{paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', width: '500px'}}>
            {isSubmitting && <LinearProgress sx={{margin: '10px 0', left: '20px', right: '0', width: '90%'}}/>}
            
            <Avatar sx={{margin: '5px auto', marginTop: '20px', backgroundColor: '#f44336'}}>
                <LockClockOutlined></LockClockOutlined>
            </Avatar>
            
            <Typography component="h3" variant="h5" sx={{textAlign: 'center', paddingTop: '10px', fontWeight: 'bold'}}>
                Login An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField form={form} name="identifier" label="Email"  />
                <PasswordField form={form} name="password" label="Password" />

                <Button disabled={isSubmitting} type="submit" variant="contained" color='primary' fullWidth sx={{marginTop: '20px', marginBottom: '30px'}}>Login</Button>
            </form>
        </div>
    )
}

export default LoginForm
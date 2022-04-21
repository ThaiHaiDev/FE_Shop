import React from "react";
import PropTypes from 'prop-types'
import InputField from "../../../../component/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import PasswordField from "../../../../component/form-control/PasswordField";

RegisterForm.propTypes = {
    onSubmit: PropTypes.func
}

function RegisterForm(props) {
    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your full name.').test('Yêu cầu nhập 2 từ trở lên', 'Please enter two words', (value) => {
            return value.split(' ').length >= 2
        }),
        email: yup.string().required('Please enter your email.').email('Please email chinh xac'),
        password: yup.string().required('Please enter your password.').min(6, 'Please password min 6 character'),
        retypePassword: yup.string().required('Please retype your password.').oneOf([yup.ref('password')], 'Passwrod dose not match')
    })

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: ''
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

        <div style={{paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
            {isSubmitting && <LinearProgress sx={{margin: '10px 0', left: '20px', right: '0', width: '90%'}}/>}
            
            <Avatar sx={{margin: '5px auto', marginTop: '20px', backgroundColor: '#f44336'}}>
                <LockClockOutlined></LockClockOutlined>
            </Avatar>
            
            <Typography component="h3" variant="h5" sx={{textAlign: 'center', paddingTop: '10px', fontWeight: 'bold'}}>
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField form={form} name="fullName" label="Full Name" />
                <InputField form={form} name="email" label="Email"  />
                <PasswordField form={form} name="password" label="Password" />
                <PasswordField form={form} name="retypePassword" label="Retype Password" />

                <Button disabled={isSubmitting} type="submit" variant="contained" color='primary' fullWidth sx={{marginTop: '20px', marginBottom: '30px'}}>Subscribe</Button>
            </form>
        </div>
    )
}

export default RegisterForm
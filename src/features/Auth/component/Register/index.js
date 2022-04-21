import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import RegisterForm from "../RegisterForm";
import PropTypes from 'prop-types'

// Nhận hàm closeDialog từ component cha Header để đóng Dialog khi đã register xong.
Register.propTypes = {
    closeDialog: PropTypes.func
}

export default function Register(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleRegisterFormSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email

            const action = register(values)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            console.log('New user:', user)

            // Thực hiện hàm đóng dialog
            const { closeDialog } = props
            closeDialog && closeDialog()  // Nếu có closeDialog thì thực hiện closeDialog()

            // Hien thong bao thanh cong hoac lam cac to do khac neu muon
            enqueueSnackbar('Register Success.', {variant: 'success'})
        } catch (error) {
            console.log('Failed:', error)
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleRegisterFormSubmit}/>
        </div>

    )
}
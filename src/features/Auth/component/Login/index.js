import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import PropTypes from 'prop-types'
import LoginForm from "../LoginForm";

// Nhận hàm closeDialog từ component cha Header để đóng Dialog khi đã register xong.
Login.propTypes = {
    closeDialog: PropTypes.func
}

export default function Login(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleLoginFormSubmit = async (values) => {
        try {

            const action = login(values)
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
            <LoginForm onSubmit={handleLoginFormSubmit}/>
        </div>

    )
}
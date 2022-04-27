import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import Product from '../../features/Product';
import Register from '../../features/Auth/component/Register';
import Login from '../../features/Auth/component/Login';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../features/Auth/userSlice';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState('login')

  // Get data from store redux
  const isUser = useSelector(state => state.user.current)
  const isUserLogin = isUser.id

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Menu Account
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userSlice.actions.logout())
    handleMenuClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>FE SHOP</Link>
          </Typography>

          <NavLink to="/product" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Product</Button>
          </NavLink>
          {!isUserLogin && (
              <Button color="inherit" sx={{color: 'white', textDecoration: 'none'}} onClick={handleClickOpen}>Login</Button>
          )}

          {isUserLogin && (
            <IconButton onClick={handleMenuClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openMenu ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined} >
              <FaceIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Menu Account  */}
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        sx={{ marginTop: '10px' }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Router  */}
      <Routes>
        <Route path="/product" element={<Product />} />
      </Routes>

      {/* Dialog Register */}
      <Dialog open={open} sx={{position: 'relative'}}>
        <CloseIcon onClick={handleClose} sx={{cursor: 'pointer', position: 'absolute', top: 0, right: 0, margin: '10px 10px', display: 'flex'}} />

        {mode === 'register' && (
          <div>
             <Register closeDialog={handleClose} />
             <Box textAlign="center">
                <Button color='primary' onClick={() => setMode('login')}>
                  <p>Alreadry have an account. Login here</p>
                </Button>
             </Box>
          </div>
        )}

        {mode === 'login' && (
          <div>
             <Login closeDialog={handleClose} />
             <Box textAlign="center">
                <Button color='primary' onClick={() => setMode('register')}>
                  Dont have an account. <p style={{fontStyle: 'italic'}}>Register here</p>
                </Button>
             </Box>
          </div>
        )}
      </Dialog>

    </Box>
  );
}

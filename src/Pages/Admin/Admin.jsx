import {
  AppBar,
  Box,
  Button,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Orders } from './Orders/Orders'
import { Products } from './Products/Products'
import { Categories } from './Categories/Categories'


export const Admin = () => {
  const menuItem = [
    {
      path: 'orders',
      title: 'Order',
    },
    {
      path: 'products',
      title: 'Products',
    },
    {
      path: 'categories',
      title: 'Categories',
    },
  ]

  const navigate = useNavigate()
  return (
    <>
      <AppBar sx={{ bgcolor: '#01411C' }}>
        <Container>
          <Toolbar>
            <AdminPanelSettingsIcon sx={{ mr: '8px' }}></AdminPanelSettingsIcon>
            <Typography mr="auto" variant="h5" component="h2">
              Admin
            </Typography>
            <Button onClick={() => navigate("/")} sx={{fontSize : "20px"}} variant="h5" >
              Client
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <List
          sx={{
            // position: 'fixed',
            width: '150px',
            height: '100vh',
            pt: '100px',
            bgcolor: '#043927',
          }}
        >
          {menuItem.map((item, index) => (
            <ListItem key={index}>
              <NavLink
                style={{
                  color: '#fff',
                  fontSize: '20px',
                  textDecoration: 'none',
                }}
                to={item.path}
              >
                {item.title}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Container sx={{ mt: '80px' }}>
          <Routes>
            <Route path="/" element={<h2>Adminka</h2>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Container>
      </Box>
    </>
  )
}

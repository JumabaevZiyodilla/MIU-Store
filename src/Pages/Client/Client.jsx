import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Avatar,
  Stack,
  Button,
  Grid,
  Badge,
  List,
} from '@mui/material'
import { Container } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb'
import { Link } from 'react-router-dom'
import { Login } from '../Login/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AuthContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/UserContext'
import { deepOrange, deepPurple } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { UserProductCart } from '../../Components/ProductCard/ProductCard'
import axios from 'axios'
import { useCart } from 'react-use-cart'
import { CartCard } from '../../Components/CartCard/CartCard'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { Modal } from '../../Components/Modal'
import Check from '@mui/icons-material/Check'

export const Client = () => {
  const [orderModal, setOrderModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [products, setProducts] = useState([])
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { totalItems, isEmpty, emptyCart, items, cartTotal, id } = useCart()
  // console.log(user);
  useEffect(() => {
    axios
      .get('http://localhost:8080/products')
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error))
  }, [])

  const handleOrder = () => {
    axios
      .post('http://localhost:8080/orders', {
        user_id: user.user.id,
        user_name: user.user.firstName,
        user_email: user.user.email,
        items: items,
        totalPrice: cartTotal,
      })
      .then((res) => {
        if (res.status === 201) {
          emptyCart(id)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <AppBar sx={{ bgcolor: '#455a64' }}>
        <Container>
          <Toolbar>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h5" component="h2" mr="auto">
              Client
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              {!token ? (
                <Link
                  to="/login"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '20px',
                  }}
                >
                  Login
                </Link>
              ) : (
                ''
              )}
              <Badge badgeContent={totalItems} color="error">
                <IconButton sx={{ p: '0px' }} onClick={() => setDrawer(true)}>
                  <ShoppingCartIcon sx={{ color: 'white' }} />
                </IconButton>
              </Badge>

              <Drawer
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    height: '100%',
                    p: '12px',
                  }}
                >
                  <Stack sx={{ flexGrow: 1 }}>
                    {isEmpty ? (
                      <Typography
                        textAlign={'center'}
                        sx={{ fontSize: '26px' }}
                      >
                        Cart is empty
                      </Typography>
                    ) : (
                      ''
                    )}
                    <List
                      sx={{
                        width: '100%',
                      }}
                    >
                      {items.map((item, index) => (
                        <CartCard key={index} item={item} />
                      ))}
                    </List>
                  </Stack>
                  <Stack
                    mt={'auto'}
                    alignItems="center"
                    spacing={2}
                    direction="row"
                  >
                    <Button
                      onClick={() => emptyCart()}
                      sx={{ bgcolor: '#AA0000' }}
                      variant="contained"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={() => setOrderModal(true)}
                      sx={{ bgcolor: '#03C03C' }}
                      variant="contained"
                    >
                      Order
                    </Button>
                    <Typography fontWeight={'700'}>
                      Total Price: $ {cartTotal}
                    </Typography>
                  </Stack>
                </Box>
              </Drawer>
              {token ? (
                <Avatar sx={{ bgcolor: deepPurple[800] }}>
                  {[user.user.firstName[0], user.user.lastName[0]]}
                </Avatar>
              ) : (
                ''
              )}

              {token ? (
                <Button
                  onClick={() => {
                    setToken('')
                    setUser('')
                    emptyCart(id)
                  }}
                  variant="Contained"
                  sx={{ color: '#fff' }}
                >
                  Logout
                </Button>
              ) : (
                ''
              )}
              <Button onClick={() => navigate('/admin')} sx={{ color: '#fff' }}>
                Admin
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box pt={'100px'}>
        <Container>
          <Grid container spacing={2}>
            {products.map((item) => (
              <Grid xs={3} item key={item.id}>
                <UserProductCart item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Modal
        title="Are you sure"
        modal={orderModal}
        setOrderModal={setOrderModal}
      >
        <Stack direction="row" p="50px" spacing={3}>
          <Button
            onClick={() => setOrderModal(false)}
            endIcon={<CloseIcon />}
            variant="contained"
            sx={{ bgcolor: '#BA0021' }}
          >
            No
          </Button>
          <Button
            // onClick={() => }
            onClick={() => {
              handleOrder()
              setOrderModal(false)
            }}
            endIcon={<CheckIcon />}
            variant="contained"
            sx={{ bgcolor: '#0BDA51' }}
          >
            Yes
          </Button>
        </Stack>
      </Modal>
    </>
  )
}

import React, { useContext, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCart } from 'react-use-cart'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { Modal } from '../Modal'
import { Stack } from '@mui/system'

export const UserProductCart = ({ item }) => {
  const { product_name, product_price, product_img, id } = item
  const { addItem } = useCart()

  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAddItem = () => {
    if (token) {
      addItem({ ...item, price: product_price })
    } else {
      navigate('/login')
    }
  }
  return (
    <Card sx={{ padding: '12px', boxShadow: '0px 0px 8px' }}>
      <CardMedia
        sx={{ height: 300 }}
        image={product_img}
        title={product_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product_name}
        </Typography>
        <Typography variant="body2">{product_price}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleAddItem()}
          endIcon={<AddShoppingCartIcon />}
          variant="contained"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export const AdminProductCart = ({ item }) => {
  const { product_name, product_price, product_img, id } = item
  const [edit, setEdit] = useState(false)
  const [ids, setIds] = useState(0)

  const productName = useRef()
  const productPrice = useRef()
  const productImg = useRef()

  const editBtn = (id) => {
    setIds(id)
  }

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/products/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  const submitEditHandler = (evt) => {
    evt.preventDefault()
    // axios
    //   .put(`http://localhost:8080/products/${ids}`, {
    //     product_name: productName.current.value,
    //     product_price: productPrice.current.value,
    //     product_img: productImg.current.value,
    //   })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error))
  }
  return (
    <>
      <Card sx={{ padding: '12px', boxShadow: '0px 0px 8px' }}>
        <CardMedia
          sx={{ height: 300 }}
          image={product_img}
          title={product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product_name}
          </Typography>
          <Typography variant="body2">$ {product_price}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              editBtn(item.id)
              setEdit(true)
            }}
            endIcon={<EditIcon />}
            variant="contained"
            sx={{ bgcolor: '#317873' }}
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteHandler(id)}
            endIcon={<DeleteIcon />}
            variant="contained"
            sx={{ bgcolor: '#002244' }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Modal modal={edit} setModal={setEdit} title="Edit Category">
        <form onSubmit={submitEditHandler}>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                inputRef={productName}
                sx={{ width: '350px' }}
                label="Category name"
              />
              <TextField
                inputRef={productPrice}
                sx={{ width: '350px' }}
                label="Category price"
              />
              <TextField
                inputRef={productImg}
                sx={{ width: '350px' }}
                label="Category img"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEdit(false)}
              type="submit"
              variant="contained"
            >
              Edit
            </Button>
          </DialogActions>
        </form>
      </Modal>
    </>
  )
}

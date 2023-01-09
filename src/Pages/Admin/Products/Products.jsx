import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import Add from '@mui/icons-material/Add'
import axios from 'axios'
import { Modal } from '../../../Components/Modal'
import { AdminProductCart } from '../../../Components/ProductCard/ProductCard'

export const Products = () => {
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [value, setValue] = useState(1)
  const [productModal, setProductModal] = useState(false)

  const nameRef = useRef()
  const priceRef = useRef()
  const imageRef = useRef()
  const categoryRef = useRef()

  useEffect(() => {
    axios
      .get('http://localhost:8080/category')
      .then((res) => setCategory(res.data))
      .catch((error) => console.log(error))
  }, [])

  const getProducts = async (id) => {
    axios
      .get('http://localhost:8080/products?category_id=' + id)
      .then((res) => {
        setProducts(res.data)
        console.log(res)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    getProducts(value)
  }, [value])

  const handleChange = (evt) => {
    setValue(+evt.target.attributes.tabIndex.nodeValue)
    console.log(+evt.target.attributes.tabIndex.nodeValue)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    axios
      .post('http://localhost:8080/products', {
        product_name: nameRef.current.value,
        product_price: priceRef.current.value,
        product_img: imageRef.current.value,
        category_id: categoryRef.current.value,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  console.log(category);
  return (
    <>
      <Box>
        <Button
          onClick={() => setProductModal(true)}
          variant="contained"
          endIcon={<Add />}
          sx={{ mb: '22px', bgcolor: '#03C03C' }}
        >
          Add Product
        </Button>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              {category.map((item, index) => (
                <Tab
                  value={item.id}
                  key={index}
                  label={item.category_name}
                  tabIndex={item.id}
                  simple-tab={item.id}
                />
              ))}
            </Tabs>
          </Box>
          {category.map((item, index) => {
            return (
              <Box
                p={"40px 20px"}
                key={index}
                role="tabpanel"
                hidden={value !== item.id}
                index={item.id}
              >
                <Grid container spacing={3}>
                  {products.map((item) => (
                    <Grid item xs={4} key={item.id} >
                      <AdminProductCart item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          })}
        </Box>
        <Modal
          title="Add Product"
          modal={productModal}
          setModal={setProductModal}
        >
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Stack spacing={2}>
                <TextField
                  inputRef={nameRef}
                  sx={{ width: '350px' }}
                  label="Product name"
                />
                <TextField
                  inputRef={priceRef}
                  sx={{ width: '350px' }}
                  label="Product price"
                />
                <TextField
                  inputRef={imageRef}
                  sx={{ width: '350px' }}
                  label="Product image url"
                />
                <TextField
                  inputRef={categoryRef}
                  select
                  sx={{ width: '350px' }}
                  label="Product category"
                  value={value}
                >
                  {category.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.category_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setProductModal(false)}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </Modal>
      </Box>
    </>
  )
}

import {
  Avatar,
  Button,
  CardMedia,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import { useCart } from 'react-use-cart'

export const CartCard = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart()
  const { product_name, product_price, product_img, id, quantity } = item
  return (
    <>
      <ListItem divider>
        <Stack direction="row" mr={"auto"} mb={'10px'} spacing={1}>
          <ListItemAvatar>
            <CardMedia
              sx={{ height: 50 }}
              image={product_img}
              title={product_name}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product_name}
            secondary={`$ ${product_price}`}
          />
        </Stack>
        <Box>
          <Stack direction="row" alignItems="center" mb={'10px'} spacing={1}>
            <Button
              onClick={() => updateItemQuantity(id, quantity + 1)}
              sx={{ minWidth: '30px' }}
              variant="contained"
              size="small"
            >
              +
            </Button>
            <Typography>{quantity}</Typography>
            <Button
              onClick={() => updateItemQuantity(id, quantity - 1)}
              sx={{ minWidth: '30px' }}
              variant="contained"
              size="small"
            >
              -
            </Button>
          </Stack>
          <Button
            sx={{display: "block", ml:"auto"}}
            
            onClick={() => removeItem(id)}
            variant="contained"
            size="small"
          >
            Remove
          </Button>
        </Box>
      </ListItem>
    </>
  )
}

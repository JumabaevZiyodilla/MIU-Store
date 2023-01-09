import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Orders = () => {
  const [order, setOrder] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/orders')
      .then((res) => setOrder(res.data))
      .catch((error) => console.log(error))
  }, [])
  console.log(order)
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Product Name</TableCell>
              <TableCell>User Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>{item.user_email}</TableCell>
                  <TableCell>
                    {item.items?.map((item) => `${item.product_name}, `)}
                  </TableCell>
                  <TableCell>$ {item.totalPrice}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

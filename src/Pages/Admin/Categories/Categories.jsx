import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import Add from '@mui/icons-material/Add'
import { Modal } from '../../../Components/Modal'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export const Categories = () => {
  const [categoryModal, setCategoryModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [category, setCategory] = useState([])
  const [ids, setIds] = useState(0)

  const categoryRef = useRef()
  const editRef = useRef()
  const editBtn = (id) => {
    setIds(id)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    axios
      .post('http://localhost:8080/category', {
        category_name: categoryRef.current.value,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/category/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  const submitEditHandler = (evt) => {
    evt.preventDefault()
    axios
      .put(`http://localhost:8080/category/${ids}`, {
        category_name: editRef.current.value,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/category')
      .then((res) => setCategory(res.data))
      .catch((error) => console.log(error))
  }, [])
  console.log(category)
  return (
    <>
      <Box>
        <Button
          onClick={() => setCategoryModal(true)}
          variant="contained"
          endIcon={<Add />}
          sx={{ mb: '22px', bgcolor: '#03C03C' }}
        >
          Add Category
        </Button>

        <Box marginTop={'20px'}>
          <TableContainer>
            <Table>
              <TableHead bgcolor="#006A4E">
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Id</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Category Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Category Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.category_name}</TableCell>
                      <TableCell>
                        <Stack direction="row">
                          <IconButton
                            onClick={() => {
                              editBtn(item.id)
                              setEdit(true)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteHandler(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal
        modal={categoryModal}
        setModal={setCategoryModal}
        title="Add Category"
      >
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <TextField
              inputRef={categoryRef}
              sx={{ width: '350px' }}
              label="Category name"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setCategoryModal(false)}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Modal>

      <Modal modal={edit} setModal={setEdit} title="Edit Category">
        <form onSubmit={submitEditHandler}>
          <DialogContent dividers>
            <TextField
              inputRef={editRef}
              sx={{ width: '350px' }}
              label="Category name"
            />
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

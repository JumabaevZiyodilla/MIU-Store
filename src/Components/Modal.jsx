import React from 'react'
import {
  DialogContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'

export const Modal = ({ children, modal, setModal, title }) => {
  return (
    <Dialog onClose={() => setModal(false)} open={modal}>
      <DialogTitle textAlign={"center"} id="customized-dialog-title">{title}</DialogTitle>
      {children}
    </Dialog>
  )
}

import React, { useContext, useState } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Link,
} from '@mui/material'
import { Stack } from '@mui/system'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/UserContext'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export const Login = () => {
  const [inputType, setInputType] = useState(false)
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  if (token) {
    navigate('/')
  }

  const schema = Yup.object({
    email: Yup.string().required('Required').email('Invalid format'),
    password: Yup.string().required('Required').min(3, '3 ta').max(8, '8 ta'),
  })

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/login', data)
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken)
          setUser(data.data)
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <Paper sx={{ width: '50%', marginX: 'auto', mt: '50px', p: '20px' }}>
        <Typography variant="h4" component="h2" textAlign="center">
          Login
        </Typography>
        <Typography textAlign="center" mb="16px">
          Sizda account yo'qmi?{' '}
          <Link to="/register" component={RouterLink} style={{ color: '#009EFA' }}>
            Sign up
          </Link>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              {...register('email')}
              helperText={errors.email?.message}
            />
            <TextField
              type={inputType ? 'text' : 'password'}
              label="Password"
              {...register('password')}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={() => setInputType(!inputType)}
                    position="end"
                  >
                    <VisibilityIcon cursor="pointer" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{ display: 'flex', alignItems: 'center' }}
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              Login {<LockOpenIcon sx={{ ml: '10px' }} />}
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  )
}

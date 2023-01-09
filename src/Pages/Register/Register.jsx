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
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/UserContext'
import { Link as RouterLink } from 'react-router-dom'

export const Register = () => {
  const [inputType, setInputType] = useState(false)
  const { setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)

  const schema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid format'),
    password: Yup.string().required('Required').min(3, '3 ta').max(8, '8 ta'),
    gender: Yup.string().required('Required'),
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/register', data)
      .then((data) => {
        if (data.status === 201) {
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
          Register
        </Typography>
        <Typography textAlign="center" mb="16px">
          Sizda account bormi?{' '}
          <Link to="/login" component={RouterLink} style={{ color: '#009EFA' }}>
            Sign in
          </Link>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="FirstName"
              {...register('firstName')}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="LastName"
              {...register('lastName')}
              helperText={errors.lastName?.message}
            />
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
            <TextField
              select
              label="Gender"
              helperText={errors.gender?.message}
              {...register('gender')}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </TextField>
            <Button
              sx={{ display: 'flex', alignItems: 'center' }}
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              Register {<VpnKeyIcon sx={{ ml: '10px' }} />}
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  )
}

import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth"
import styles from './Login.module.scss';
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const distpatch = useDispatch()
  const { register, handleSubmit, setError, formState: {
    errors, isValid
  } } = useForm({
    defaultValues: {
      fullName: 'mark',
      email: 'mark1324@test.ru',
      password: '12345678',
    },
    mode: 'onChange',
  })

  const onSumbit = async (values) => {
    const data = await distpatch(fetchRegister(values))

    if(!data.payload){
        return alert('You can not registred')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
     <form  onSubmit={handleSubmit(onSumbit)}>
     <TextField className={styles.field} label="Полное имя" fullWidth
        {...register('fullName', { required: "Enter Your fullName" })}
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
       />

      <TextField className={styles.field} label="E-Mail" fullWidth
        {...register('email', { required: "Enter Your Email" })}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"  />

      <TextField className={styles.field} label="Пароль" fullWidth 
        {...register('password', { required: "Enter Your password" })}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password" />

      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
     </form>
    </Paper>
  );
};

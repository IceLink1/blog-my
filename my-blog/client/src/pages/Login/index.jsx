import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth"
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const distpatch = useDispatch()
  const { register, handleSubmit, setError, formState: {
    errors, isValid
  } } = useForm({
    defaultValues: {
      email: 'test@test.ru',
      password: '1234'
    },
    mode: 'onChange',
  })

  const onSumbit = async (values) => {
    const data = await distpatch(fetchAuth(values))

    if(!data.payload){
        return alert('You can not login')
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Enter Your Email" })}
          fullWidth
        />
        <TextField className={styles.field} label="Пароль" fullWidth
          {...register('password', { required: "Enter Your Password" })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

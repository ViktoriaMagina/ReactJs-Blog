import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
export const Login = () => {
  const dispatch = useDispatch()
  const authCheck = Boolean(useSelector(state => state.auth.data))
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values))
    if(!data.payload){
      return alert("Не удалось авторизоваться")
    }
    if("token" in data.payload){
      window.localStorage.setItem("token", data.payload.token)
    } else{
      alert("Не удалось авторизоваться")
    }
  };

  if(authCheck){
    return <Navigate to={"/"}/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          {...register('password', { password: 'Укажите пароль' })}
        />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

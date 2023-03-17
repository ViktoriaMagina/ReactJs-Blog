import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {useSelector, } from 'react-redux';
import { Link } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Navigate ,useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const isAuth = Boolean(useSelector((state) => state.auth.data));
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState("");
  const isEditing = Boolean(id)


  const onSubmit = async() => {
    try {
      const fields = {
        title,
        tags,
        text
      }
      const {data} = isEditing? await axios.patch(`/posts/${id}`, fields) : await axios.post("/posts", fields) 
      const _id = isEditing? id: data._id
      navigate(`/posts/${_id}`)
    } catch (error) {
      console.log(error);
    }
  }
  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  React.useEffect(()=> {
    if(id){
      axios.get(`/posts/${id}`).then(res => {
        console.log(res)
        setTitle(res.data.title)
        setText(res.data.text)
        setTags(res.data.tags)
      }).catch(err => console.log(err))
    }
  }, [])

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
      />
      <TextField classes={{ root: styles.tags }} value={tags} variant="standard" placeholder="Тэги" fullWidth  onChange={(e)=> setTags(e.target.value)}/>
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

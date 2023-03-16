import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPopularPosts,fetchNewsPosts } from '../redux/slices/posts.js';


export const Home = () => {
  const [tab, setTab] = React.useState(0)
  const dispach = useDispatch();
  const {posts} = useSelector((state) => state.posts)
  const userData = useSelector((state) => state.auth.data)
  let isPostLoading = posts.status === 'pending';
  React.useEffect(() => {
    dispach(fetchPosts());
  }, []);
  const onClickNew = () => {
    dispach(fetchNewsPosts())
    setTab(0)
  }
  const onClickPopular = () => {
    dispach(fetchPopularPosts())
    setTab(1)
  }
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tab} aria-label="basic tabs example">
        <Tab onClick={onClickNew} label="Новые" />
        <Tab onClick={onClickPopular} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((item, index) =>
          
            isPostLoading ? (
              <Post key={index} isLoading={true}/>
            ) : (
              <Post
                key={item._id}
                _id={item._id}
                title={item.title}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable={userData? userData._id === item.user._id: false}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

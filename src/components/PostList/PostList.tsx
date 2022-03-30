import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from '../../redux/actions';
import { selectPosts } from '../../redux/selectors';
import { PostListView } from '../PostListView';

export const PostList = (): JSX.Element => {
  const posts = useSelector(selectPosts);
  const { isLoading, error, items } = posts;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts()(dispatch);
  }, [dispatch]);

  if (isLoading) {
    return <div>Skeleton</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <PostListView items={items} />;
};

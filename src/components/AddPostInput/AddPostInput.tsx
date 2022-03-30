import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { moxios, API_URL, API_ROUTES } from '../../services/moxios';
import { fetchPosts } from '../../redux/actions/posts';
import { selectProfile } from '../../redux/selectors';
import { PostInputView } from '../PostInputView';
import { Post } from '../../types';
import { TEXT } from '../../common/constants';

type Props = {
  parentId?: number;
  handleCancelClick?: () => void;
};

const requestAddPost = async (payload: {
  data: Pick<Post, 'author' | 'content'>;
  parentId?: number;
}) => {
  await moxios.post({
    url: `${API_URL}${API_ROUTES.POSTS}`,
    payload
  });
};

export const AddPostInput = ({
  parentId,
  handleCancelClick = () => {}
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    requestAddPost({
      data: {
        author: profile,
        content: inputValue
      },
      parentId
    });
    setInputValue('');
    fetchPosts()(dispatch);
  };

  return (
    <PostInputView
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleConfirmClick={handleAddClick}
      confirmCaption={TEXT.BUTTONS.ADD_COMMENT}
      handleCancelClick={handleCancelClick}
    />
  );
};

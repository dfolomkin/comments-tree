import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { moxios, API_URL, API_ROUTES } from '../../services/moxios';
import { fetchPosts } from '../../redux/actions/posts';
import { PostInputView } from '../PostInputView';
import { TEXT } from '../../common/constants';

type Props = {
  id: number;
  initValue: string;
  handleCancelClick: () => void;
};

const requestUpdatePost = async (
  id: number,
  payload: {
    data: {
      content: string;
    };
  }
) => {
  await moxios.put({
    url: `${API_URL}${API_ROUTES.POSTS}/${id}`,
    payload
  });
};

export const EditPostInput = ({
  id,
  initValue,
  handleCancelClick
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState(initValue);
  const dispatch = useDispatch();

  const handleEditClick = async () => {
    requestUpdatePost(id, {
      data: {
        content: inputValue
      }
    });

    setInputValue('');
    fetchPosts()(dispatch);
  };

  return (
    <PostInputView
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleConfirmClick={handleEditClick}
      confirmCaption={TEXT.BUTTONS.CONFIRM}
      handleCancelClick={handleCancelClick}
    />
  );
};

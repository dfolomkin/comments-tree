import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import { moxios, API_URL, API_ROUTES } from '../../services/moxios';
import { selectProfile } from '../../redux/selectors';
import { fetchPosts } from '../../redux/actions';
import { AddPostInput } from '../AddPostInput';
import { EditPostInput } from '../EditPostInput';
import { PostListView } from '../PostListView';
import { PostOptions } from '../PostOptions';
import { isPostDeleted } from '../../common/utils';
import { DELETED_POST_ICON, TEXT } from '../../common/constants';
import { Post as TPost } from '../../types';
import {
  ProfileIcon,
  ProfileName,
  DateTime,
  PostContent,
  ReplyButton,
  RepliesWrapper
} from './Styles';

type Props = { data: TPost };

const requestDeletePost = async (id: number) => {
  await moxios.delete({
    url: `${API_URL}${API_ROUTES.POSTS}/${id}`
  });
};

export const Post = ({ data }: Props): JSX.Element => {
  const { id, status, dateTime, author, content, replies } = data;
  const [isReplyInputVisible, setReplyInputVisible] = useState(false);
  const [isEditInputVisible, setEditInputVisible] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const isPostEditable = author && author.name === profile.name;

  const handleReplyClick = () => {
    setReplyInputVisible(!isReplyInputVisible);
  };

  const handleEditClick = () => {
    setEditInputVisible(!isEditInputVisible);
  };

  const handleDeleteClick = () => {
    requestDeletePost(id);
    fetchPosts()(dispatch);
  };

  const optionHandlers = [
    {
      caption: TEXT.BUTTONS.EDIT,
      handler: handleEditClick
    },
    {
      caption: TEXT.BUTTONS.DELETE,
      handler: handleDeleteClick
    }
  ];

  return (
    <>
      <Flex mb={9} alignItems="center">
        <ProfileIcon url={author?.icon || DELETED_POST_ICON} />
        {!isPostDeleted(status) ? (
          <Box ml={9}>
            <ProfileName>{author?.name}</ProfileName>
            <Box mt={-1}>
              <DateTime>{dateTime}</DateTime>
            </Box>
          </Box>
        ) : (
          <Box ml={9}>
            <DateTime>
              {TEXT.STATUS_MESSAGES.DELETED} {dateTime}
            </DateTime>
          </Box>
        )}
      </Flex>

      {isEditInputVisible ? (
        <EditPostInput
          id={id}
          initValue={content || ''}
          handleCancelClick={handleEditClick}
        />
      ) : (
        <PostContent>{content}</PostContent>
      )}

      {!isPostDeleted(status) && (
        <Flex alignItems="center">
          <ReplyButton onClick={handleReplyClick}>
            {TEXT.BUTTONS.REPLY}
          </ReplyButton>
          {isPostEditable && <PostOptions handlers={optionHandlers} />}
        </Flex>
      )}
      {isReplyInputVisible && (
        <AddPostInput handleCancelClick={handleReplyClick} parentId={id} />
      )}

      <RepliesWrapper>
        <PostListView items={replies} />
      </RepliesWrapper>
    </>
  );
};

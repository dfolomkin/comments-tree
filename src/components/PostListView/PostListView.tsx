import styled from 'styled-components';

import { Post } from '../Post';
import { Post as TPost } from '../../types';

const PostUnorderedList = styled.ul`
  padding: 0;
  margin-bottom: 14px;
`;

const PostListItem = styled.li`
  list-style-type: none;
`;

type Props = {
  items?: TPost[];
};

export const PostListView = ({ items }: Props): JSX.Element | null =>
  items ? (
    <PostUnorderedList>
      {items.map((item) => (
        <PostListItem key={item.id}>
          <Post data={item} />
        </PostListItem>
      ))}
    </PostUnorderedList>
  ) : null;

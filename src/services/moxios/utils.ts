import { Post } from '../../types';

export const getIdFromUrl = (url: string, route: string) => {
  const index = url.indexOf(route);
  const id = url.slice(index + route.length + 1);

  return Number(id);
};

// TODO use lib like moment.js !!!
export const formatDate = (date: Date) =>
  `${date.getDate()}.${
    date.getMonth() + 1
  }.${date
    .getFullYear()
    .toString()
    .slice(2)} ${date.getHours()}:${date.getMinutes()}`;

export const recursivelyInsertReply = (
  items: Post[],
  reply: Post,
  parentId: number
): boolean => {
  let isInserted = false;
  let index = 0;

  while (!isInserted && index !== items.length) {
    if (items[index].id === parentId) {
      items[index].replies.push(reply);
      isInserted = true;
    } else if (items[index].replies.length) {
      isInserted = recursivelyInsertReply(
        items[index].replies,
        reply,
        parentId
      );
    }
    index++;
  }

  return isInserted;
};

export const recursivelyDeletePost = (items: Post[], id: number): boolean => {
  let isDeleted = false;
  let index = 0;

  while (!isDeleted && index !== items.length) {
    if (items[index].id === id) {
      items[index].status = 'deleted';
      items[index].author = null;
      items[index].content = '';
      isDeleted = true;
    } else if (items[index].replies.length) {
      isDeleted = recursivelyDeletePost(items[index].replies, id);
    }
    index++;
  }

  return isDeleted;
};

export const recursivelyUpdatePost = (
  items: Post[],
  update: Pick<Post, 'dateTime' | 'content'>,
  id: number
): Post | null => {
  let updatedPost: Post | null = null;
  let index = 0;

  while (!updatedPost && index !== items.length) {
    if (items[index].id === id) {
      items[index].dateTime = update.dateTime;
      items[index].content = update.content;
      updatedPost = { ...items[index] };
    } else if (items[index].replies.length) {
      updatedPost = recursivelyUpdatePost(items[index].replies, update, id);
    }
    index++;
  }

  return updatedPost;
};

import cloneDeep from 'clone-deep';

import dataBuckup from './data-backup.json';
import { API_ROUTES, MESSAGES } from './constants';
import {
  getIdFromUrl,
  formatDate,
  recursivelyInsertReply,
  recursivelyDeletePost,
  recursivelyUpdatePost
} from './utils';
import { Post } from '../../types';

type GetReqParams = {
  url: string;
};

type PostReqParams = {
  url: string;
  payload: {
    data: Pick<Post, 'author' | 'content'>;
    parentId?: number;
  };
};

type PutReqParams = {
  url: string;
  payload: {
    data: {
      content: string;
    };
  };
};

class Moxios {
  private data: { posts: Post[] };

  constructor(private dataBackup: { posts: Post[] }, private nextId: number) {
    this.data = cloneDeep(this.dataBackup);
  }

  get({ url }: GetReqParams) {
    const isPostsRoute = new RegExp(`${API_ROUTES.POSTS}`).test(url);

    return isPostsRoute
      ? Promise.resolve(this.data.posts)
      : Promise.reject(MESSAGES.MISSED_ROUTE);
  }

  post({ url, payload }: PostReqParams) {
    const { data: payloadData, parentId } = payload;
    let isInserted = false;

    const reply = {
      ...payloadData,
      id: this.nextId++,
      status: null,
      dateTime: formatDate(new Date()),
      replies: []
    } as Post;

    if (!parentId) {
      this.data.posts.push(reply);
      isInserted = true;
    } else {
      isInserted = recursivelyInsertReply(this.data.posts, reply, parentId);
    }

    return isInserted
      ? Promise.resolve(reply)
      : Promise.reject(MESSAGES.MISSED_PARENT_POST);
  }

  put({ url, payload }: PutReqParams) {
    const { content } = payload.data;
    const id = getIdFromUrl(url, API_ROUTES.POSTS);
    const update = {
      content,
      dateTime: formatDate(new Date())
    };
    console.log(update);
    const updatedPost = recursivelyUpdatePost(this.data.posts, update, id);

    return updatedPost
      ? Promise.resolve(updatedPost)
      : Promise.reject(MESSAGES.MISSED_POST);
  }

  delete({ url }: GetReqParams) {
    const id = getIdFromUrl(url, API_ROUTES.POSTS);
    const isDeleted = recursivelyDeletePost(this.data.posts, id);

    return isDeleted
      ? Promise.resolve({})
      : Promise.reject(MESSAGES.MISSED_POST);
  }
}

export const moxios = new Moxios(dataBuckup, 8);

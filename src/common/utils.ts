export const POST_STATUS = {
  DELETED: 'deleted'
};

export const isPostDeleted = (status: string | null) =>
  status === POST_STATUS.DELETED;

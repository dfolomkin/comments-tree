export type Post = {
  id: number;
  status: string | null;
  dateTime: string;
  author: {
    name: string;
    icon: string;
  } | null;
  content: string | null;
  replies: Post[];
};

export type State = {
  posts: {
    isLoading: boolean;
    error: string | null;
    items: Post[];
  };
  profile: {
    name: string;
    icon: string;
  };
};

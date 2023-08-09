type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  date: string;
  user: UserInfo;
  comment: string;
  rating: number;
};

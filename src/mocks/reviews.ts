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

export const mockReviews: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://i.pravatar.cc/301',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b643a',
    date: '2020-06-08T12:13:12.569Z',
    user: {
      name: 'John Cena',
      avatarUrl: 'https://i.pravatar.cc/302',
      isPro: true
    },
    comment: 'Zhi es krasivoe mesto',
    rating: 5
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd64343a',
    date: '2020-06-07T11:11:11.569Z',
    user: {
      name: 'Ryan Gosling',
      avatarUrl: 'https://i.pravatar.cc/303',
      isPro: false
    },
    comment: 'Ya ne umer v kontse Drive',
    rating: 2
  },
];

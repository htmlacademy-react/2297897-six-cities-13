import {Review, UserInfo} from '../store/offers-process/offers-process.slice.ts';
import faker from 'faker';

export const generateMockReview = (): Review => {
  const userInfo: UserInfo = {
    name: faker.name.findName(),
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean(),
  };

  const review: Review = {
    id: faker.datatype.uuid(),
    date: faker.date.recent().toISOString(),
    user: userInfo,
    comment: faker.lorem.paragraph(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };

  return review;
};

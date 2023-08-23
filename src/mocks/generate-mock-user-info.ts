import {UserInfo} from '../store/user-process/user-process.slice.ts';
import faker from 'faker';

export const generateUserInfo = (): UserInfo => {
  const userInfo: UserInfo = {
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    isPro: faker.datatype.boolean(),
    name: faker.name.findName(),
    token: faker.datatype.uuid(),
  };
  return userInfo;
};

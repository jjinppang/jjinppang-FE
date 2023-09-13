import {atom} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        email: '',
      },
});

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: '', 
  });
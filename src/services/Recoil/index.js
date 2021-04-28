/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export default {
  toUser: atom({
    key: 'toUser',
    default: {
      isGroup: true,
      name: 'PUBLIC ROOM',
      picture: '/',
      status: 'Silahkan berghibah'
    }
  })
};

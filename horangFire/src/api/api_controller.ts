import axios from 'axios';
import {getDataInLocalStorage} from '../store/AsyncService';
import {CharacterInfo, Report} from './apiDataType';
import urls from './urls';

const api = {
  auth: {
    login: async (socialId: string) => {
      const response = await axios({
        url: urls.auth.login(),
        method: 'post',
        data: {
          id: socialId,
          role: 'User',
        },
      });
      return response;
    },
  },

  diary: {
    submitMain: async (diary: any) => {
      console.log(diary);
      const res = await axios({
        //url: urls.diary.submit(),
        method: 'post',
        data: {
          ...diary,
        },
      });
      console.log(res);
      return res;
    },
  },

  character: {
    getNowUserCharacter: async (userId: string) => {
      const response = await axios({
        url: urls.character.getNowUserCharacter(userId),
        headers: {
          token: await getDataInLocalStorage('token'),
        },
        method: 'get',
      });
      return response;
    },
    getCharacterList: async () => {
      const response = await axios({
        url: urls.character.getCharacterList(),
        headers: {
          token: await getDataInLocalStorage('token'),
        },
        method: 'get',
      });
      return response;
    },
    create: async (characterInfo: CharacterInfo) => {
      const response = await axios({
        url: urls.character.create(),
        headers: {
          token: await getDataInLocalStorage('token'),
        },
        method: 'post',
        data: {
          ...characterInfo,
        },
      });

      return response;
    },
    getCharacterDialog: async (id: number) => {
      console.log(id);
      const response = await axios({
        url: urls.character.getCharacterDialog(id),
        headers: {
          token: await getDataInLocalStorage('token'),
        },
        method: 'get',
      });
      return response;
    },
  },

  user: {
    getUserInfo: async (kakaoId: string) => {
      const response = await axios({
        url: urls.user.getUserInfo(kakaoId),
        headers: {
          token: await getDataInLocalStorage('token'),
        },
        method: 'get',
      });

      return response;
    },
  },

  community: {
    getCommunityAll: async () => {
      const response = await axios({
        url: urls.community.getCommunityAll(),
        method: 'get',
      });

      return response;
    },

    getCommunityDetail: async (id: number) => {
      const response = await axios({
        url: urls.community.getCommunityDetail(id),
        method: 'get',
      });

      return response;
    },

    report: async (data: Report) => {
      console.log(data);
      const response = await axios({
        url: urls.community.report(),
        method: 'post',
      });
      return response;
    },
  },

  notice: {
    getNoticeAll: async () => {
      const response = await axios({
        url: urls.notice.getNoticeAll(),
        method: 'get',
      });

      return response;
    },
    getNoticeDetail: async (id: number) => {
      const response = await axios({
        url: urls.notice.getNoticeDetail(id),
        method: 'get',
      });

      return response;
    },
  },
};

export default api;

import {createAsyncThunk} from '@reduxjs/toolkit';
import {IListParams} from '../interface/IStories';
import {TOKEN} from '../resources/constants/api';
import R from '../resources/R';
import {customAxios} from '../utility/customAxios';

export const getStories = createAsyncThunk(
  'stories/getStories',
  async (params: IListParams) => {
    try {
      const res: any = await customAxios.get(
        `${R.servers.nytimes}${R.url.topStories(params.section)}?${TOKEN}`,
      );

      if (res.data) {
        return {results: res.data.results};
      }
    } catch (e) {
      console.error(e);
    }
  },
);

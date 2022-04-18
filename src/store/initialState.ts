import {IRootState} from '../interface/IRootState';

const initialState: IRootState = {
  stories: {
    data: {
      results: [],
    },
    loading: false,
    error: false,
  },
};

export default initialState;

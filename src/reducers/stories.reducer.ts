import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {getStories} from '../actions/stories.action';
import {IStories} from '../interface/IStories';
import initialState from '../store/initialState';

export const stories = createSlice({
  name: 'stories',
  initialState: initialState.stories,
  reducers: {
    reset: _ => initialState.stories,
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getStories.pending), (state: IStories) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getStories.fulfilled),
      (state: IStories, action: any) => {
        if (action.payload?.error) {
          state.error = {...state.error, ...action.payload.error};
        } else {
          state.data = {...action.payload};
          state.loading = false;
          state.error = undefined;
        }
      },
    );
    builder.addMatcher(
      isAnyOf(getStories.rejected),
      (state: IStories, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

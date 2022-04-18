import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {IRootState} from '../interface/IRootState';
import {stories} from '../reducers/stories.reducer';

const reducer = combineReducers<IRootState>({
  stories: stories.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

import {configureStore} from '@reduxjs/toolkit';
import haveReducer from '../Reducer/have-reducer';
import needReducer  from '../Reducer/Need-Reducer';
import userReducer  from '../Reducer/User-Reducer';

export const store = configureStore({
    reducer: {
        haveReducer,
        needReducer,
        userReducer
    },
      devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

})
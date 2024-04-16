import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import movieReducer from '../Features/movie/movieSlice'

const store = configureStore({
    reducer: {
        movie: movieReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;
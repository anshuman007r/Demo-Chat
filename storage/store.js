import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authReducer'

const rootReducer = combineReducers({
    authReducer : authReducer
})

const persistConfig = {
    // Root
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'authReducer',
    ],
    timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    applyMiddleware(
        createLogger(),
    ),
);

const persistor = persistStore(store);

export { store, persistor };
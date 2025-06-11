import {combineReducers, configureStore, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfoList: [],
        adminLoginFlag: false,
        userLoginFlag: false
    },
    reducers: {
        addUserInfo: (state, action) => {
            state.userInfoList.push(action.payload);
        },
        setUserInfoList: (state, action) => {
            state.userInfoList = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfoList = [];
        },
        adminLogin: (state) => {
            state.adminLoginFlag = true;
        },
        adminLogout: (state) => {
            state.adminLoginFlag = false;
        },
        userLogin: (state) => {
            state.userLoginFlag = true;
        },
        userLogout: (state) => {
            state.userLoginFlag = false;
        },
    }
});

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchParams: {
            destination: "",
            checkInDate: "",
            checkOutDate: "",
            guests: 1,
        },
        filters: {
            type: "",
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
            max_capacity: 1,
        },
        searchResults: null,
    },
    reducers: {
        setSearchParams(state, action) {
            state.searchParams = {...state.searchParams, ...action.payload};
        },
        setFilters(state, action) {
            state.filters = {...state.filters, ...action.payload};
        },
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
        resetFilters(state) {
            state.filters = {
                type: "",
                bedrooms: 0,
                beds: 0,
                bathrooms: 0,
                max_capacity: 1,
                price_per_night: 0,
            };
        },
    },
});

const accomSlice = createSlice({
    name: "accom",
    initialState: {
        list: [],
    },
    reducers: {
        setAccom: (state, action) => {
            state.list = action.payload;
        },
        addAccom: (state, action) => {
            state.list.push(action.payload);
        },
        removeAccom: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
    },
});

const initState = {
    token: null,
}

const tokenSlice = createSlice({
    name: "token",
    initialState: initState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userInfo", "token"],
};

const rootReducer = combineReducers({
    userInfo: userInfoSlice.reducer,
    token: tokenSlice.reducer,
    search: searchSlice.reducer,
    accom: accomSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const {
    userLogin,
    userLogout,
    addUserInfo,
    clearUserInfo,
    setUserInfoList,
    adminLogin,
    adminLogout
} = userInfoSlice.actions;
export const {setToken} = tokenSlice.actions;
export const {
    setSearchParams,
    setFilters,
    setSearchResults,
    resetFilters
} = searchSlice.actions;
export const {setAccom, addAccom, removeAccom} = accomSlice.actions;
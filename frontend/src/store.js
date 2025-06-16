import {combineReducers, configureStore, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfoList: [],
        currentUser: null,
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
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
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
            state.userInfoList = [];
            state.currentUser=null;
            state.userLoginFlag = false;
        },
    }
});

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchParams: {
            address: "",
            checkindate: "",
            checkoutdate: "",
            maxcapacity: 1,
        },
        filters: {
            type: "",
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            maxcapacity: 1,
        },
        searchResults: [],
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
                maxcapacity: 1,
                pricePerNight: 0,
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
        updateAccom: (state, action) => {
            const index = state.list.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        removeAccom: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
    },
});

const bookSlice=createSlice({
    name:"book",
    initialState:{
        list:[],
    },
    reducers:{
        updateBook:(state, action)=>{
            const index=state.list.findIndex(item=>item.id===action.payload.id);
            if(index !== -1){
                state.list[index]=action.payload;
            }
        }
    }
})

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
    book:bookSlice.reducer,
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
    setCurrentUser,
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
export const {setAccom, addAccom, updateAccom, removeAccom} = accomSlice.actions;

export const {updateBook}=bookSlice.actions;
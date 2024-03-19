import {createSlice} from '@reduxjs/toolkit';

const secretKeySlice = createSlice({
    name: 'secretKey',
    initialState: {
        isLoadingTableSecretKey: false,
        secretKey: {},
        secretKeyActive: null,
        dataFilter: {
            keySearch: '',
            field: null,
            sortOrder: null,
        },
        infoSecretKey: {
            secret_key: ''
        },
        errorInfoSecretKey: {
            secret_key: ''
        }
        
    },
    reducers: {
        getListSecretKey: (state) => ({
            ...state,
            secretKey: {},
            isLoadingTableSecretKey: true,
        }),
        getListSecretKeySuccess: (state, action) =>{
            return {
                ...state,
            isLoadingTableSecretKey: false,
            secretKey: action.payload.data,
            };
        },
        getListSecretKeyFailure: (state) => ({
            ...state,
            secretKey: {},
            isLoadingTableSecretKey: false
        }),

        setDataFilter: (state, action) => {
            return {
                ...state,
                dataFilter: action.payload.data
            };
        },

        setInfoSecretKey: (state, action) => {
            return {
                ...state,
                infoSecretKey: action.payload.data
            };
        },
        setErrorInfoSecretKey: (state, action) => ({
            ...state,
            errorInfoSecretKey: action.payload.data
        }),
    }
});

export const {
    
    getListSecretKey,
    getListSecretKeySuccess,
    getListSecretKeyFailure,
    setErrorInfoSecretKey,
    setInfoSecretKey,
    setDataFilter,
    
} = secretKeySlice.actions;
export default secretKeySlice.reducer;

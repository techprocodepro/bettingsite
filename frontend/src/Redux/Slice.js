import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     _id: "1234",
//     userName: "manoj",
//     fullName: "manoj kumar",
//     history: [{ name: "crash", gameId: "1234", Time: "1230140125", put: 100, take: 50 }, { name: "roulette", gameId: "5678", time: "1240140125", put: 100, take: 50 }, { name: "dice", gameId: "9012", time: "1250140125", put: 100, take: 50 }],
//     walletAmount: 1000,
// }
const initialState = {
    _id: "",
    userName: "",
    fullName: "",
    history: [],
    walletAmount: 0,
    isLoggedIn: false,
    isRegister: false,
}



const Slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.userName = action.payload
        },
        addWalletAmount: (state, action) => {
            state.walletAmount += action.payload
        },
        deductWalletAmount: (state, action) => {
            state.walletAmount -= action.payload
        },
        fetchUserData: (state, action) => {
            return { ...state, ...action.payload }
        },
        logoutUser: () => {
            return initialState
        },
        setRegister: (state, action)=> {
            state.isRegister = action.payload
        },
        setLoggedIn: (state,action)=>{
            state.isLoggedIn = action.payload
        }
    },
});

export const { changeName, addWalletAmount, deductWalletAmount, fetchUserData, logoutUser,setRegister, setLoggedIn } = Slice.actions;
export default Slice.reducer;

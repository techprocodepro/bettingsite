import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Slice"

const Store = configureStore({
    reducer: Reducer
})
export default Store;
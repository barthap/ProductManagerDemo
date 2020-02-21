import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../core/reducers";

//Typescript implementation for Redux useSelector()
export const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

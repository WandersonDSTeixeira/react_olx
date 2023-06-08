import { Dispatch, ReactNode } from "react";
import { User } from '../types/User';


export type DataType = {
    user: User | null;
    refreshUser: boolean;
}

export type ActionType = {
    type: Actions,
    payload?: any; 
}

export type ContextType = {
    state: DataType;
    dispatch: Dispatch<ActionType>;
}

export type ProviderType = {
    children: ReactNode
}

export enum Actions {
    SET_USER,
    SET_REFRESH_USER
}
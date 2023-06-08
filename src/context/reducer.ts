import { DataType, ActionType, Actions } from "./types";

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) {     
        case Actions.SET_USER:
            if (!action.payload.user) return { ...state, user: null };
            return { ...state, user: action.payload.user };
        case Actions.SET_REFRESH_USER:
            if (!action.payload.refreshUser) return { ...state, refreshUser: false  };
            return { ...state, refreshUser: action.payload.refreshUser };
        default: return state;
    }
}
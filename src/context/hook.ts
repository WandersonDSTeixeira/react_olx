import { useContext } from "react"
import { AppContext } from "."
import { User } from "../types/User"
import { Actions } from "./types"

export const useAppContext = () => {
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setUser: (user: User | null) => {
            dispatch({
                type: Actions.SET_USER,
                payload: { user }
            });
        },
        setRefreshUser: (refreshUser: boolean) => {
            dispatch({
                type: Actions.SET_REFRESH_USER,
                payload: { refreshUser }
            });
        }
    }
}
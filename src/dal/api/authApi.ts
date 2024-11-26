import {baseApi} from "../../app/baseApi";
import {CommonResponse} from "./todolistsApi";

type AuthRequest = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

type MeDataResponse = {
    id: number
    email: string
    login: string
}

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<CommonResponse<{userId: number, token: string}>, AuthRequest>({
            query: ({email, password, rememberMe = false, captcha = false}) => ({
                url: 'auth/login',
                method: 'POST',
                body: {
                    email,
                    password,
                    rememberMe,
                    captcha
                }
            })
        }),
        logout: builder.mutation<CommonResponse, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE'
            })
        }),
        me: builder.query<CommonResponse<MeDataResponse>, void>({
            query: () => 'auth/me'
        })
    })
})

export const {useLoginMutation, useMeQuery, useLogoutMutation} = authApi
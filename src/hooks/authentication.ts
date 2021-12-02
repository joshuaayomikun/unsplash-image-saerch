import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { apiUrls, ACCESS_KEY, cookieKeys, SECRET_KEY } from '../constants'
import { fetchJson, getCookie, setCookie } from '../lib'
import { AuthModel } from '../models/auth'
export default function useAuthentication() {
    // const url = "/api/passport"
    const {mutate} = useSWRConfig()
    const { data: user, mutate: _mutateUser, error } = useSWR<AuthModel>(typeof window === "undefined" || getCookie(cookieKeys.token) == "" ? null : apiUrls.unsplashProfile)
    // const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string>(typeof window !== "undefined" ? getCookie(cookieKeys.token) : "")

    const postLoginAction = (token: string) => {
        setCookie(cookieKeys.token, token, 60)
        const confirmToken = getCookie(cookieKeys.token)
        if (confirmToken !== "") {
            setToken(confirmToken)
        }
    }
    const signOut = () => {
        setCookie(cookieKeys.token, "", -60)
        const confirmToken = getCookie(cookieKeys.token)
        if (confirmToken === "") {
            setToken("")
        }
    }
    const signIn = () => {
        window.location.href = `${apiUrls.unsplashAuthorizeUrl}${window.location.protocol}//${window.location.host}/callback`
        // loginWithPassport()
    }

    useEffect(() => {
        if (window) {
            const cookieToken = getCookie(cookieKeys.token)
            if (cookieToken !== "") {
                setToken(cookieToken)
            }
        }
    }, [])


    useEffect(() => {
        // debugger
        if (typeof window !== "undefined") {

            if (getCookie(cookieKeys.token) === "") {
                setToken("")
            }
            if(typeof error !== "undefined") {
                setCookie(cookieKeys.token, "", -60)
                setToken("")
            }
        }
    }, [user, error])

    interface TokenRequestBody {
        client_id:string,
        redirect_uri:string,
        grant_type:string,
        code:string
    }

    const loginWithunSplash = async (code?: string) => {
        // debugger
        if (typeof code !== "undefined") {
            const body = {
                client_id: ACCESS_KEY,
                redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
                grant_type: "authorization_code",
                code,
                client_secret: SECRET_KEY
            }
            const urlencoded = new URLSearchParams();
            Object.keys(body).forEach((x) => {
                urlencoded.append(x, body[x as keyof TokenRequestBody])
            })
            try {
                const response = await fetchJson<any>(apiUrls.unsplashTokenUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept-Version": "v1"
                    },
                    body: urlencoded
                })
                // debugger
                if (typeof response !== "undefined") {
                    postLoginAction(response.access_token)
                    mutate(apiUrls.unsplashProfile)
                }
            } catch (error) {
                throw error
            }
        }

    }

    return { user, token, error, signIn, signOut, loginWithunSplash }
}


import { getCookie } from ".";
import { cookieKeys, notificationMesage } from "../constants";

export async function fetchJson<T extends Record<keyof T, T[keyof T]>>(input: RequestInfo, init?: RequestInit): Promise<T> {

    try {
        // console.log({init});
        // debugger
        let token = typeof window !== "undefined" ? getCookie(cookieKeys.token) : ""
        const response = token !== "" ? await fetch(input, typeof init === "undefined" ? {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Accept-Version": "v1"
            }
        } : init) : await fetch(input, init);
        const data = await response.json() as T
        // debugger
        if (response.ok) {
                return data as T;
        }
        else {
            throw notificationMesage.AnErrorOccurred
        }

    } catch (error: any) {
        throw error
    }

}

export function changeObjectToQueryParams<T extends Record<keyof T, T[keyof T]>> (body : T) {

    const urlencoded = new URLSearchParams();
    Object.keys(body).forEach((x) => {
        urlencoded.append(x, body[x as keyof T])
    })

    return urlencoded
}
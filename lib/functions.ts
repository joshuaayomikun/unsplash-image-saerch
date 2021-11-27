import { getCookie } from ".";
import { notificationMesage } from "../constants";

export async function fetchJson<T extends Record<keyof T, T[keyof T]>>(input: RequestInfo, init?: RequestInit): Promise<T> {

    try {
        // console.log({init});
        // debugger
        let token = typeof window !== "undefined" ? getCookie("token") : ""
        const response = token !== "" ? await fetch(input, typeof init === "undefined" ? {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`
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
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { ACCESS_KEY, apiUrls, cookieKeys } from '../constants';
import _ from 'lodash'
import { Photos, } from 'unsplash-js/dist/methods/search/types/response';
import useSWR, { mutate, useSWRConfig } from 'swr';
import { changeObjectToQueryParams, fetchJson, getCookie } from '../lib';
import { Basic } from 'unsplash-js/dist/methods/photos/types';

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: ACCESS_KEY
});

interface SearchQuery {
    query: string,
    page: number,
    perPage: number
}
const search = async (searchquery: SearchQuery) => {
    return await api.search.getPhotos({ query: searchquery.query, page: searchquery.page, perPage: searchquery.perPage })
}
export function useUnsplash() {
    const [photoResponse, setPhotosResponse] = useState<Photos>();
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState({ query: "", page: 0, perPage: 15 })
    const [searchQueryString, setSearchQueryString] = useState("")
    const { mutate } = useSWRConfig()
    const { data: searchResponse, mutate: _mutate, error } = useSWR<Photos>(typeof window === "undefined" || getCookie(cookieKeys.token) === "" || searchQuery.query === "" ? null : `${apiUrls.unsplashSearchPhotos}?${searchQueryString}`)
    let initialSearch = [] as string[];
    const initialSearchString = typeof window !== "undefined" ? window.localStorage.getItem("search-history") : ""
    if (typeof window !== "undefined" && initialSearchString !== "" && initialSearchString !== null) {
        initialSearch = JSON.parse(initialSearchString)
    }
    const [searchHistory, setSearchHistory] = useState(initialSearch)
    const photoSearch = (query: typeof searchQuery) => {
        // debugger
        setSearchQuery(query)
    }

    useEffect(() => {
        // debugger
        const srch = _.debounce(async () => {

            try {
                const response = await search(searchQuery)
                if (response.status === 200) {
                    setPhotosResponse(response.response as Photos)
                } else {
                    throw response.errors?.toString()
                }
            } catch (error) {
                throw error
            }
            setLoading((_prev) => false)
        }, 500)
        if (searchQuery.query !== "") {
            setLoading((_prev) => true)
            if (getCookie(cookieKeys.token) === "") {
                srch()
            }
        } else {
            setPhotosResponse(undefined)
            setLoading((_prev) => false)

        }
        _.debounce(() => setSearchQueryString(changeObjectToQueryParams<typeof searchQuery>(searchQuery).toString()), 2000)()
    }, [searchQuery])

    // useEffect(() => {
    //     if (searchQuery.query !== "" && getCookie(cookieKeys.token) !== "") {
    //         (_.debounce(() =>
    //             mutate(), 500))()
    //     }
    // }, [searchQueryString])

    useEffect(() => {
        // debugger
        if (typeof searchResponse !== "undefined") {
            setLoading((_prev) => false)
            setPhotosResponse(searchResponse)
        }
    }, [searchResponse, error])

    const mutateSearch = (photoId: { id: string, method: string }) => {
        mutate(`${apiUrls.unsplashSearchPhotos}?${searchQueryString}`, async (resp: Photos) => {
            //    debugger
            const response = await fetchJson<{ photo: Basic }>(`${apiUrls.unsplashLike}${photoId.id}/like`, {
                method: photoId.method,
                headers: {
                    authorization: `Bearer ${getCookie(cookieKeys.token)}`,
                    "accept-version": "v1"
                }
            })

            const filteredPhoto = resp.results.filter(photo => photo.id !== photoId.id)
            return {
                ...resp,
                results: [
                    response.photo,
                    ...filteredPhoto,

                ]
            }
        })
    }

    useEffect(() => {
        debugger
        if (searchQuery.query !== "") {
            if (typeof window !== "undefined") {
                const searchHistoryString = window.localStorage.getItem("search-history")
                if (searchHistoryString === null || searchHistoryString === "") {
                    setSearchHistory([searchQuery.query])
                    window.localStorage.setItem("search-history", JSON.stringify([searchQuery.query]))
                } else {
                    const parsedSearchHistory = JSON.parse(searchHistoryString)
                    if (parsedSearchHistory.length < 5) {
                        const setSearch = new Set([searchQuery.query, ...parsedSearchHistory])
                        const s = [...setSearch]
                        setSearchHistory(s)
                        window.localStorage.setItem("search-history", JSON.stringify(s))
                    } else if (parsedSearchHistory.length === 5) {
                        const s = parsedSearchHistory.slice(0, 4)
                        const setSearch = new Set([searchQuery.query, ...s])
                        setSearchHistory([...setSearch])
                        window.localStorage.setItem("search-history", JSON.stringify([...setSearch]))
                    }
                }
            }
        }
    }, [searchQuery])
    return { photoResponse, loading, photoSearch, mutateSearch, searchHistory }
}
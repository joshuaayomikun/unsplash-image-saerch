import _ from "lodash";
import { createContext } from "react";
import { countPerPage, initialIndex } from "../constants/pagination";
import { usePagination, useUnsplash } from "../hooks";

export const SearchContext = createContext<ReturnType<typeof useUnsplash> & ReturnType<typeof usePagination>>({
    photoResponse: undefined,
    searchHistory:[],
    loading: false,
    photoSearch: () => { },
    pageNumber: initialIndex,
    countPerPage: countPerPage,
    totalPageNumber: 100,
    changeCountPerPage: () => (""),
    incrementPageNumber: () => (""),
    decrementPageNumber: () => (""),
    gotoPage: () => (""),
    setPaginationProps: () => (""),
    mutateSearch: (_photoId: {
        id: string;
        method: string;
    }) => ("")
})

interface SearchProviderProps {
    children: JSX.Element | JSX.Element[]
}
const SearchProvider: React.FC<SearchProviderProps> = (props: SearchProviderProps) => {
    return (
        <SearchContext.Provider value={{...useUnsplash(), ...usePagination(countPerPage)}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchProvider
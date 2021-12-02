import { useEffect, useState } from "react";
import { initialIndex } from "../constants/pagination";

export function usePagination(initialCountPerPage: number) {
    // console.log({totalNumber, initialCountPerPage})
    // debugger

    const [pageNumber, setPageNumber] = useState(initialIndex)
    const [totalPageNumber, setTotalPageNumber] = useState<number>()
    const [countPerPage, setCountPerPage] = useState<number>(initialCountPerPage)
    const [totalNumber, setTotalNumber] = useState<number>()
    const incrementPageNumber = () => {
        if (typeof totalPageNumber !== "undefined" && pageNumber < totalPageNumber) {
            setPageNumber(prev => prev + 1)
        }
    }

    const decrementPageNumber = () => {
        if (pageNumber > 0) {
            setPageNumber(prev => prev - 1)
        }
    }

    const changeCountPerPage = (value: number) => {

        setCountPerPage(value)
    }

    const gotoPage = (value: number) => {
        setPageNumber(value)
    }

    useEffect(() => {
        setTotalPageNumber((prev) => {
            // debugger
            if (typeof totalNumber !== "undefined" && typeof countPerPage !== "undefined") {
                const division = Math.floor(totalNumber / countPerPage)
                if (totalNumber % countPerPage == 0) {
                    return division
                } else {
                    return division + 1
                }
            }
            return prev as unknown as number

        })
    }, [countPerPage, totalNumber])


    const setPaginationProps = (totalNumber: number) => {
        // debugger
        setTotalNumber(totalNumber)
    
    }


    return { pageNumber, countPerPage, totalPageNumber, changeCountPerPage, incrementPageNumber, decrementPageNumber, gotoPage, setPaginationProps }
}
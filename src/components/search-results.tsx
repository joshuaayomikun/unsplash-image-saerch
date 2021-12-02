import { Box, Grid, Skeleton, TablePagination, Typography } from "@mui/material"
import _ from "lodash"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { SearchContext } from "../providers/search-provider"
import { initialIndex } from "../constants/pagination"
import { useNotification, AppAlert } from "./app-alert"
import ImageList from "./image-lists"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import { Basic } from "unsplash-js/dist/methods/photos/types"

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const SearchResult: React.FC = (_props: any) => {
    const { photoResponse, loading, countPerPage, pageNumber, gotoPage, changeCountPerPage, mutateSearch, searchHistory } = useContext(SearchContext)
   
    const [selectedPhotoToLike, setSelectedPhotoToLike] = useState({
        id: "",
        method: ""
    })
    const { notification, notify } = useNotification()


    useEffect(() => {
        
        if (selectedPhotoToLike.id !== "" && selectedPhotoToLike.method !== "") {
            mutateSearch(selectedPhotoToLike)
        }
    }, [selectedPhotoToLike])

    const handleClose = () => {
        notify({
            isOpen: false
        })
    }

    const ImageResult = useCallback(() => (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            width:"100%",
            flexDirection:"column"
        }}>
            {!loading && typeof photoResponse !== "undefined" && <Typography align="center">Search results based on {searchHistory[0]}</Typography>}
            <ImageList loading={loading} photos={photoResponse?.results as Basic[]} setSelectedPhotoToLike={setSelectedPhotoToLike} />
            {!loading && typeof photoResponse !== "undefined" && photoResponse.total === 0 && <Typography>No image available for {searchHistory[0]}, try with a better search query</Typography> }
        </Box>
    ), [photoResponse?.results, loading])
    return (
        <>
            <ImageResult/>
            {(loading) && <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={8}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={8}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
            </Grid>}
            {!loading && typeof photoResponse !== "undefined" && photoResponse.total > 0 && <TablePagination
                component="div"
                count={typeof photoResponse !== "undefined" ? photoResponse.total : 0}
                page={pageNumber}
                onPageChange={(_x, page) => {
                    gotoPage(page)
                }}
                rowsPerPage={countPerPage}
                onRowsPerPageChange={(e) => {
                    changeCountPerPage(parseInt(e.target.value))
                    gotoPage(initialIndex)
                }}
            />}
            {typeof notification !== "undefined" && <AppAlert title={notification.title} isOpen={notification.isOpen} reason="" status={notification.status} handleClose={handleClose} />}
        </>
    )
}

export default SearchResult
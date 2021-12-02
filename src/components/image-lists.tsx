import { ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { ImageListItem, ImageListItemBar, IconButton, ImageList } from "@mui/material";
import _ from "lodash";
import React, { useContext } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { AuthContext } from "../providers/auth-provider";
interface ImageListProps {
    loading: boolean,
    photos: Basic[],
    setSelectedPhotoToLike?: any
}
export default function ImageLists(props: ImageListProps) {
    const { user } = useContext(AuthContext)
    return (<>
        {!props.loading && typeof props.photos !== "undefined" && <ImageList sx={{
            width: "fit-content"
        }} variant="masonry" cols={4} gap={10}>
            {_.map(props.photos, (item: Basic & { liked_by_user: boolean }) => (
                <ImageListItem key={item.urls.regular}>
                    <img
                        src={`${item.urls.small}`}
                        srcSet={`${item.urls.regular}`}
                        alt={item.alt_description as string}
                        loading="eager"
                    />

                    <ImageListItemBar position="below" title={`${item.likes} likes`} actionIcon={
                        <>
                            {typeof user !== "undefined" && typeof props.setSelectedPhotoToLike !== "undefined"? <>
                                <IconButton sx={{
                                    color: item.liked_by_user ? "blue" : "initial"
                                }} onClick={() => props.setSelectedPhotoToLike({ id: item.id, method: "POST" })} ><ThumbUpOffAlt /></IconButton>
                                {item.liked_by_user && <IconButton onClick={() => props.setSelectedPhotoToLike({ id: item.id, method: "DELETE" })} ><ThumbDownOffAlt /></IconButton>}
                            </> : <></>}
                        </>
                    } />
                </ImageListItem>
            ))}

        </ImageList>
        }</>
    )
}
import { Search as SearchIcon } from "@mui/icons-material";
import { alpha, Autocomplete, Box, Button, styled, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { initialIndex } from "../constants/pagination";
import { SearchContext } from "../providers/search-provider";



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid black",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: 'inherit',
   '& .MuiOutlinedInput-notchedOutline': {
       border: "unset"
   },
   '& .MuiOutlinedInput-root': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
   },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '200px !important',
            '&:focus': {
                width: '300px !important',
            },
        },
        border: "0 solid"
    },
}));

const SearchBar: React.FC = (_props: any) => {
    const { photoSearch, pageNumber, countPerPage, gotoPage, searchHistory } = useContext(SearchContext)
    const [value, setValue] = useState("")
    useEffect(() => {
        photoSearch({ query: value, page: pageNumber, perPage: countPerPage })
    }, [pageNumber, countPerPage])

    return (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            width:"100%"
        }}>
            <Autocomplete
                freeSolo
                id="combo-box-demo"
                options={searchHistory.map((x) => ({ label: x }))}
                onSelect={(e) => {
                    const ele = e.target as HTMLInputElement
                    setValue(ele.value)
                }}
                renderInput={(params) => <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        {...params}
                        placeholder="Search…"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        onInput={(e) => {
                            e.stopPropagation()
                            const ele = e.target as HTMLInputElement
                            setValue(ele.value)
                        }}
                    />
                    <Button onClick={() => {
                        gotoPage(initialIndex)
                        photoSearch({ query: value, page: pageNumber, perPage: countPerPage })
                    }}>Search</Button>
                </Search>
                } />

        </Box>
    )
}

export default SearchBar
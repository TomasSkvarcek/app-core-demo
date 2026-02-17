import {useState} from "react";
import {useDebounce} from "use-debounce";

export function useSearch(debounceDelay = 500) {
    const [searchData, setSearchData] = useState(null)
    const [debouncedSearchData, setDebouncedSearchData] = useState(null)
    const [debouncedSearch] = useDebounce(debouncedSearchData, debounceDelay)
    const [syncSearchData, setSyncSearchData] = useState({})

    function setSearchSync(searchData) {
        setSearchData(searchData)
        setSyncSearchData(searchData)
    }

    function setDebouncedSearchSync(searchData) {
        setDebouncedSearchData(searchData)
        setSyncSearchData(searchData)
    }

    function clearSearch() {
        setSearchData(null)
        setDebouncedSearchData(null)
        setSyncSearchData({})
        setSearchSync({})
    }

    function pageChanged(page) {
        const newQuery = {
            ...syncSearchData,
            page: page,
        }
        setSearchSync(newQuery)
    }

    function handleSearch(value, field) {
        const newQuery = {
            page: 1,
            search: {
                ...syncSearchData.search,
                [field]: value
            },
        }
        setSearchSync(newQuery)
    }

    function handleSearchDebounced(value, field) {
        const newQuery = {
            page: 1,
            search: {
                ...syncSearchData.search,
                [field]: value
            },
        }
        setDebouncedSearchSync(newQuery)
    }

    function handleSort(field) {
        let order = 'asc'
        if (syncSearchData.search?.sort) {
            if (syncSearchData.search?.sort.column === field && syncSearchData.search?.sort.order === 'asc') {
                order = 'desc'
            }
        }

        const newQuery = {
            page: 1,
            search: {
                ...syncSearchData.search,
                sort: {
                    column: field,
                    order: order
                }
            },
        }
        setSearchSync(newQuery)
    }

    return {
        searchData,
        setSearchData,
        debouncedSearchData,
        setDebouncedSearchData,
        debouncedSearch,
        syncSearchData,
        setSyncSearchData,
        setSearchSync,
        setDebouncedSearchSync,
        clearSearch,
        pageChanged,
        handleSearch,
        handleSearchDebounced,
        handleSort
    }
}

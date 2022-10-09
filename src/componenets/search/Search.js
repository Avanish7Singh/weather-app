import React, { useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOption, geoUrl } from "../../Api"



const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (searchInput) => {
       return fetch(`${geoUrl}/cities?minPopulation=1000000&&namePrefix=${searchInput}`,
            geoApiOption)
            .then(response => response.json())
            .then(res => {
                return {
                    options: res.data.map((city) =>{
                        return{
                            value:`${city.latitude} ${city.longitude}` ,
                            label: `${city.name} ,${city.countryCode} `   
                        }
                    })
                }
                //console.log(response)
            })
            .catch(err => console.error(err));
    }

    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }

    return (
        <div>
            <AsyncPaginate
                placeholder="search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleChange}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default Search
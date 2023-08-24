import Container from '@mui/material/Container';
import SelectTextFields from "./SelectBoxes.jsx";
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import Data from './Data.jsx'
import {useEffect, useState} from "react";

import exoplanets from "../dataset/exoplanets.js";


export default function MainComponent() {

    // Initially, the dropdown boxes are set to have empty initial states.
    const [hostName, setHostName] = useState([]);
    const [discoveryMethod, setDiscoveryMethod] = useState([]);
    const [discoveryYear, setDiscoveryYear] = useState([]);
    const [discoveryFacility, setDiscoveryFacility] = useState([]);

    // Due to the presence of repetitive data in the archive, I need to utilize sets, which exclusively hold distinct values.
    useEffect(() => {
        const hostName = [...new Set(exoplanets.map(item => item.hostname))];
        const discoveryMethod = [...new Set(exoplanets.map(item => item.discoverymethod))];
        const discoveryYear = [...new Set(exoplanets.map(item => item.disc_year))];
        const discoveryFacility = [...new Set(exoplanets.map(item => item.disc_facility))];

        // setting the dropdown menu with the unique values
        setHostName(hostName);
        setDiscoveryMethod(discoveryMethod);
        setDiscoveryYear(discoveryYear)
        setDiscoveryFacility(discoveryFacility)
    }, []);

    // Following each key press in the search, the obtained results will be stored in the result variable.
    const [results, setResults] = useState([])

    // When the browser is loading for the first time, a message will be displayed. Otherwise, the search results will
    // be shown. This functionality is utilized in the `Data.jsx` file and passed via props.
    const [firstTime, setFirstTime] = useState(true)

    // handling the logic for search
    function handleSearch() {

        // capturing the data from the dropdown boxes
        const hostname = document.getElementById('hostname').textContent
        const discoveryMethod = document.getElementById('discovery_method').textContent
        const discoveryYear = document.getElementById('discovery_year').textContent
        const discoveryFacility = document.getElementById('discovery_facility').textContent

        // selected criteria
        const selectedCriteria = {
            "hostname": hostname === "​" ? null : hostname,
            "discoverymethod": discoveryMethod === "​" ? null : discoveryMethod,
            "disc_facility": discoveryFacility === "​" ? null : discoveryFacility,
            "disc_year": isNaN(parseInt(discoveryYear)) ? null : parseInt(discoveryYear),
        };

        // Important note: Our objective is to identify objects for which the selected criteria act as a subset. The `isSubset` function plays a crucial role in accomplishing this task.

        function isSubset(obj1, obj2) {
            const filteredObject = Object.fromEntries(
                Object.entries(obj2).filter(([_, value]) => value !== null)
            );
            for (const key in filteredObject) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            return true;
        }

        const matchingExoplanets = exoplanets.filter(exoplanet => isSubset(exoplanet, selectedCriteria));

        // Oh, once more, the acquired data contains a significant amount of repetition, requiring us to resort to using sets once more.
        const uniqueData = Array.from(new Set(matchingExoplanets.map(JSON.stringify))).map(JSON.parse);
        setResults([...uniqueData])

        // Once the results are loaded, we will no longer display the initial message.
        setFirstTime(false)
    }

    // Resetting all selected data and hiding the displayed table.
    function handleClear() {
        const hostname = document.getElementById('hostname').textContent = ""
        const discoveryMethod = document.getElementById('discovery_method').textContent = ""
        const discoveryYear = document.getElementById('discovery_year').textContent = ""
        const discoveryFacility = document.getElementById('discovery_facility').textContent = ""
        setResults([])
    }

    return <Container
    >
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '15px'
            }}
        >
            <SelectTextFields helperText={"Host Name"} options={hostName.slice(1, 50)} id="hostname"/>
            <SelectTextFields helperText={"Discovery Method"} options={discoveryMethod} id="discovery_method"/>
            <SelectTextFields helperText={"Discovery Year"} options={discoveryYear} id="discovery_year"/>
            <SelectTextFields helperText={"Discovery Facility"} options={discoveryFacility} id="discovery_facility"/>
        </Container>
        <Stack
            direction={'row'}
            sx={{
                marginBottom: 5
            }}
        >
            <Button variant={'contained'} size={'small'} sx={{marginRight: 2, marginLeft: 1}}
                    onClick={handleSearch}>Search</Button>
            <Button variant={'outlined'} size={'small'} onClick={handleClear}>Clear</Button>
        </Stack>
        <Data queryResults={results} firstTime={firstTime}/>
    </Container>
}
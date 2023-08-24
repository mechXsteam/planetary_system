import Container from '@mui/material/Container';
import SelectTextFields from "./SelectBoxes.jsx";
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import Data from './Data.jsx'
import {useEffect, useState} from "react";

import exoplanet from "../dataset/exoplanet.js";


const yearHashTable = {};
const methodHashTable = {};
const hostnameHashTable = {};
const facilityHashTable = {};

exoplanet.forEach(row => {
    const {pl_name, hostname, discoverymethod, disc_year, disc_facility} = row;

    // Populate yearHashTable
    if (!yearHashTable[disc_year]) {
        yearHashTable[disc_year] = [];
    }
    yearHashTable[disc_year].push(row);

    // Populate methodHashTable
    if (!methodHashTable[discoverymethod]) {
        methodHashTable[discoverymethod] = [];
    }
    methodHashTable[discoverymethod].push(row);

    // Populate hostnameHashTable
    if (!hostnameHashTable[hostname]) {
        hostnameHashTable[hostname] = [];
    }
    hostnameHashTable[hostname].push(row);

    // Populate facilityHashTable
    if (!facilityHashTable[disc_facility]) {
        facilityHashTable[disc_facility] = [];
    }
    facilityHashTable[disc_facility].push(row);
});

// Function to perform compound query
function compoundQuery(selectedCriteria) {
    let result = [...exoplanet];

    selectedCriteria.forEach(criteria => {
        const hashTable = getHashTableForCriteria(criteria);
        if (hashTable) {
            const selectedValue = criteria.value;
            const matchingRows = hashTable[selectedValue] || [];
            result = result.filter(row => matchingRows.includes(row));
        }
    });

    return result;
}

// Helper function to get hash table based on criteria
function getHashTableForCriteria(criteria) {
    switch (criteria.key) {
        case 'year':
            return yearHashTable;
        case 'method':
            return methodHashTable;
        case 'hostname':
            return hostnameHashTable;
        case 'facility':
            return facilityHashTable;
        default:
            return null;
    }
}

// Example usage of compoundQuery


export default function MainComponent() {
    const [hostName, setHostName] = useState([]);
    const [discoveryMethod, setDiscoveryMethod] = useState([]);
    const [discoveryYear, setDiscoveryYear] = useState([]);
    const [discoveryFacility, setDiscoveryFacility] = useState([]);

    useEffect(() => {
        // Extract unique values of x and y from the data
        const hostName = [...new Set(exoplanet.map(item => item.hostname))];
        const discoveryMethod = [...new Set(exoplanet.map(item => item.discoverymethod))];
        const discoveryYear = [...new Set(exoplanet.map(item => item.disc_year))];
        const discoveryFacility = [...new Set(exoplanet.map(item => item.disc_facility))];
        setHostName(hostName);
        setDiscoveryMethod(discoveryMethod);
        setDiscoveryYear(discoveryYear)
        setDiscoveryFacility(discoveryFacility)
    }, []);
    const [results, setResults] = useState([])
    const [firstTime, setFirstTime] = useState(true)

    function handleSearch() {
        const hostname = document.getElementById('hostname').textContent
        const discoveryMethod = document.getElementById('discovery_method').textContent
        const discoveryYear = document.getElementById('discovery_year').textContent
        const discoveryFacility = document.getElementById('discovery_facility').textContent
        console.log("text content", {hostname, discoveryMethod, discoveryYear, discoveryFacility})
        const selectedCriteria = [
            // {key: 'facility', value: discoveryFacility},
            // {key: 'year', value: discoveryYear},
            {key: 'method', value: discoveryMethod},

        ];
        const queryResults = compoundQuery(selectedCriteria);
        setResults(queryResults)
        setFirstTime(false)
    }

    function handleClear() {
        const hostname = document.getElementById('hostname').textContent = ""
        const discoveryMethod = document.getElementById('discovery_method').textContent = ""
        const discoveryYear = document.getElementById('discovery_year').textContent = ""
        const discoveryFacility = document.getElementById('discovery_facility').textContent = ""
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
            <SelectTextFields helperText={"Host Name"} options={hostName} id="hostname"/>
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
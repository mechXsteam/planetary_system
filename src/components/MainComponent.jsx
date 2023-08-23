import Container from '@mui/material/Container';
import SelectTextFields from "./SelectBoxes.jsx";
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import Data from './Data.jsx'


export default function MainComponent() {
    return <Container
    >
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '15px'
            }}
        >
            <SelectTextFields helperText={"Host Name"}/>
            <SelectTextFields helperText={"Discovery Method"}/>
            <SelectTextFields helperText={"Discovery Year"}/>
            <SelectTextFields helperText={"Discovery Facility"}/>
        </Container>
        <Stack
            direction={'row'}
            sx={{
                marginBottom: 5
            }}
        >
            <Button variant={'contained'} size={'small'} sx={{marginRight: 2, marginLeft: 1}}>Search</Button>
            <Button variant={'outlined'} size={'small'}>Clear</Button>
        </Stack>
        <Data/>


    </Container>
}
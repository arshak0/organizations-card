import React from "react";
import {Box, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import { LARGE_FIELD_WIDTH} from "../../constants/constants";

export function CustomFieldBoxString (props: {
    text: string,
    state: string;
    setState: (arg0: string ) => void;
}) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => props.setState(event.target.value)

    return (
        <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, width: '100%', marginTop: 3}}>
            <Typography sx={{alignSelf: 'center', minWidth: { xs: 0, md: LARGE_FIELD_WIDTH}}} variant="caption">
                {props.text}
            </Typography>
            <TextField sx={{marginTop: { xs: 3, md: 0}}} type='text' size='small' id="outlined-basic" label={props.text} variant="outlined" value={props.state} onChange={handleChange} />
        </Box>
    );
}

export function CustomFieldBoxNumber (props: {
    text: string,
    state: number;
    setState: (arg0: number) => void;
}) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let intValue = parseInt(event.target.value);
        if (intValue> 0) props.setState(intValue)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, width: '100%', marginTop: 3}}>
            <Typography sx={{alignSelf: 'center', minWidth: { xs: 0, md: LARGE_FIELD_WIDTH}}} variant="caption">
                {props.text}
            </Typography>
            <TextField sx={{marginTop: { xs: 3, md: 0}}} type='number' size='small' id="outlined-basic" label={props.text} variant="outlined" value={props.state} onChange={handleChange} />
        </Box>
    );
}

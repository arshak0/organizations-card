import React from "react";
import {Box, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import { LARGE_FIELD_WIDTH} from "../../constants/constants";

export default function CustomFieldBox (props) {

    const handleChange = (e) => {
        if (props.type === 'number' && e.target.value>0) props.setState(parseInt(e.target.value))
        else props.setState(e.target.value)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, width: '100%', marginTop: 3}}>
            <Typography sx={{alignSelf: 'center', minWidth: { xs: 0, md: LARGE_FIELD_WIDTH}}} variant="caption">
                {props.text}
            </Typography>
            <TextField sx={{marginTop: { xs: 3, md: 0}}} type={props.type} size='small' id="outlined-basic" label={props.text} variant="outlined" value={props.state} onChange={handleChange} />
        </Box>
    );
}

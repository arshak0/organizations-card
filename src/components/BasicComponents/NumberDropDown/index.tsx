import React, {useEffect, useState, useRef} from "react";
import {ASSIGNED_VALUE_STEP} from "../../../constants/constants";
import OrganizationCard from "../../OrganizationCard";

export default function NumberDropDown (props:
{ value: number, in_use: number }) {
    const [value, setValue] = useState<number>(props.value)
    const selectEl = useRef<HTMLSelectElement>(null)
    const [optionsArray, setOptionsArray] = useState<Array<number>>([])

    useEffect(() => {
        //console.log(props)
    })


    useEffect(() => {
        let maxOption = Math.max(props.value, props.in_use);
        let select = selectEl.current;

        if ( select && select.options[0] &&
            maxOption !== parseInt(select.options[ select.options.length-1 ].value)) {
            setOptionsArray([]);
            let forOptionsArray = [];
            for (let ii = ASSIGNED_VALUE_STEP; ii <= maxOption; ii += ASSIGNED_VALUE_STEP) {
                forOptionsArray.push(ii);
                setOptionsArray(forOptionsArray);
            }
        }

        if ( select && !select.options[0] ) {
            console.log(select.options)
            let forOptionsArray = [];
            for (let ii = ASSIGNED_VALUE_STEP; ii <= maxOption; ii += ASSIGNED_VALUE_STEP) {
                forOptionsArray.push(ii);
                setOptionsArray(forOptionsArray);
            }
        }

        setValue((props.value))
    },[props.value, props.in_use])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(parseInt(event.target.value))
        //need to change in the redux store
    }

    return (
        <form>
            <select ref={selectEl} className='Number__select'
                value={value}
                onChange={handleChange}
                style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    lineHeight: 1.66,
                    letterSpacing: '0.03333em'}}
            >
                {optionsArray.map((org) => (
                    <option key={org} value={org}>{org}</option>
                ))}
            </select>
        </form>
    );
}





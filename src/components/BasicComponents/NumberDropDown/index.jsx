import React, {useEffect, useState, useRef} from "react";

export default function NumberDropDown (props) {
    const [value, setValue] = useState(props.value)
    const selectEl = useRef(null)

    useEffect(() => {
        //console.log(props)
    })


    useEffect(() => {
        let maxOption = Math.max(props.value, props.in_use)
        let select = selectEl.current
        if ( !(select.options[0] && maxOption === select.options[select.options.length - 1].value ) ) {
                for (let ii = 5; ii <= maxOption; ii += 5) {
                    let option = document.createElement("OPTION");
                    option.text = ii;
                    option.value = ii;
                    select.options.add(option);
                }

        }
        setValue((props.value))
    },[props.value, props.in_use])

    const handleChange = (event) => {
        setValue((event.target.value))
        props.handleChange(event.target.value)
    }

    return (
        <form variant="standard" sx={{ m: 1, width: 60 }}>
            <select ref={selectEl} className="Number__select" type="number"
                value={value}
                onChange={handleChange}
                style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    lineHeight: 1.66,
                    letterSpacing: '0.03333em'}}
            >
            </select>
        </form>
    );
}





import React, {useEffect, useState} from "react";
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import OrganizationCard from "../OrganizationCard";
import OrganizationChangeModal from "../OrganizationChangeModal";
import * as CONSTANTS from "../../constants/constants";
import * as TEXTS from "../../constants/texts";

export default function OrganizationsPage() {
    const [allOrganizations, setAllOrganizations] = useState(CONSTANTS.INITIAL_ORGANIZATIONS_ARRAY);
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDeleteOrg = (value) => {
        let forAllOrganizations = [...allOrganizations];
        for ( let ii=0; ii<forAllOrganizations.length; ii++ ) {
            if (forAllOrganizations[ii].id === value) forAllOrganizations.splice(ii,1)
        }
        setAllOrganizations(forAllOrganizations);
    }

    const handleEditOrg = (value) => {
        let forAllOrganizations = allOrganizations.map(card => card.id === value.id ? value : card)
        setAllOrganizations(forAllOrganizations);
    }

    useEffect(() => setFilteredOrganizations(allOrganizations) ,[allOrganizations])

    const handleSubmitNewOrg = (value) => {
        let forAllOrganizations = [...allOrganizations];
        value.id=allOrganizations[allOrganizations.length-1].id + 1;
        forAllOrganizations.push(value);
        setAllOrganizations(forAllOrganizations);
        setOpenModal((false));
    }

    const handleFilterOrganizations = (event) => {
        if (event.target.value) {
            let forFiltering = [];
            for (let ii=0; ii<allOrganizations.length; ii++) {
                if (allOrganizations[ii].name.toLowerCase().includes(event.target.value)) forFiltering.push(allOrganizations[ii])
            }
            setFilteredOrganizations(forFiltering)
        }
        else setFilteredOrganizations(allOrganizations)
    }

    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {TEXTS.HEADER_TEXT}
                </Typography>
            </header>

            <section className="Organizations-cards">
                <div className="Controls-row">
                    <div className="Flex-row-justify-content-start">
                        <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold', alignSelf: 'center' }}>
                            {TEXTS.ALL_ORGANIZATIONS} ({filteredOrganizations.length})
                        </Typography>
                        <Box sx={{display: 'flex', border: 1, borderColor: "secondary.main", borderRadius: CONSTANTS.BASE_BORDER_RADIUS, paddingLeft: 3, paddingRight: 3}}>
                            <InputBase  onChange={handleFilterOrganizations}
                                placeholder={TEXTS.SEARCH_ORGANIZATION_PLACEHOLDER}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <Box sx={{display: 'inline', alignSelf: 'center'}}>
                                <SearchIcon  sx={{ color: 'secondary.main', marginTop: 1}}/>
                            </Box>
                        </Box>
                    </div>
                    <Button variant="contained" onClick={handleOpenModal}>{TEXTS.ADD_NEW}</Button>
                    {openModal && <OrganizationChangeModal handleSubmit={handleSubmitNewOrg} handleClose={handleCloseModal}/>}
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} className="Organizations-cards-layout">
                    {filteredOrganizations.map((org) => (
                        <OrganizationCard card={org} key={org.name} handleDelete={handleDeleteOrg} handleEdit={handleEditOrg}/>
                    ))}
                </Box>
                <Button variant="contained" sx={{marginTop: 3}}>{TEXTS.LOAD_MORE}</Button>
            </section>
        </div>
    );
}

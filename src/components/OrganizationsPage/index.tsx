import React, {useEffect, useState} from "react";
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import OrganizationCard from "../OrganizationCard";
import OrganizationChangeModal from "../OrganizationChangeModal";
import * as CONSTANTS from "../../constants/constants";
import * as TEXTS from "../../constants/texts";

import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {selectOrganizations, addOrganization, removeOrganization} from "../../store/slice";
import type {Organization} from "../../store/slice";

export default function OrganizationsPage() {
    const organizations = useAppSelector(selectOrganizations);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(organizations)
    })

    const deleteOrganization = (orgId: number) => {
        dispatch(removeOrganization(orgId))
    }
    const addNewOrganization = (org: Organization) => {
        dispatch(addOrganization(org))
    }

    const [filteredOrganizations, setFilteredOrganizations] = useState<Array<Organization>>([]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => setFilteredOrganizations(organizations) ,[organizations])

    const handleFilterOrganizations = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            let forFiltering = [];
            for (let ii=0; ii<organizations.length; ii++) {
                if (organizations[ii].name.toLowerCase().includes(event.target.value)) forFiltering.push(organizations[ii])
            }
            setFilteredOrganizations(forFiltering)
        }
        else setFilteredOrganizations(organizations)
    }

    return (
        <Box className="App">
            <header className="App-header">
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {TEXTS.HEADER_TEXT}
                </Typography>
            </header>

            <section className="Organizations-cards">
                <Box sx={{alignItems: { xs: 'center', md: 'unset'}}} className="Controls__row">
                    <Box sx={{display: 'flex', flexDirection: { xs: "column", md: "row"}, justifyContent: 'start', gap: 3}}>
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
                    </Box>
                    <Button sx={{marginTop: { xs: 3, md: 'unset'}, width: { xs: 250, md: 'unset'}}} variant="contained" onClick={handleOpenModal}>{TEXTS.ADD_NEW}</Button>
                    {openModal && <OrganizationChangeModal handleClose={handleCloseModal}/>}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} className="Organizations__cards__layout">
                    {organizations.map((org) => (
                        <OrganizationCard card={org} key={org.id}/>
                    ))}
                </Box>
                <Button variant="contained" sx={{marginTop: 3}}>{TEXTS.LOAD_MORE}</Button>
            </section>
        </Box>
    )
}

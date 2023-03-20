import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import type {RootState} from "./store"

export type Organization = {
    id: number;
    name: string;
    tr_in_use: number;
    tr_assign: number;
    pr_in_use: number;
    pr_assign: number;
    logo: string;
}

interface OrganizationState {
    organizations: Array<Organization>
}

const initialState: OrganizationState = {
    organizations: [
        { id: 0, name: 'Organization 1 from redux', tr_in_use: 1245, tr_assign: 1200,
            pr_in_use: 300, pr_assign: 850, logo: './logos/logo1.svg'},
        { id: 1, name: 'Organization 2 from redux', tr_in_use: 1245, tr_assign: 1200,
            pr_in_use: 300, pr_assign: 850, logo: './logos/logo2.svg'},
        { id: 2, name: 'Organization 3 from redux', tr_in_use: 1245, tr_assign: 1200,
            pr_in_use: 300, pr_assign: 850, logo: './logos/logo3.svg'},
        { id: 3, name: 'Organization 4 from redux', tr_in_use: 1245, tr_assign: 1200,
            pr_in_use: 300, pr_assign: 850, logo: './logos/logo4.svg'},
        { id: 4, name: 'Organization 5 from redux', tr_in_use: 1245, tr_assign: 1200,
            pr_in_use: 300, pr_assign: 850, logo: './logos/logo5.svg'},
    ]
}

export const organizationSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        addOrganization: (state, action: PayloadAction<Organization>) => {
            const organization = action.payload;
            let forOrganization = {...organization}
            forOrganization.id = state.organizations[state.organizations.length-1].id+1
            state.organizations.push(forOrganization);
        },
        removeOrganization: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const organizations = state.organizations.filter((org) => org.id !== id);
            state.organizations = organizations;
        },
        editOrganization: (state, action: PayloadAction<Organization>) => {
            const organization = action.payload;
            const organizations = state.organizations.map((org)=>org.id === organization.id ? org = organization : org);
            state.organizations = organizations;
        }
    }
})

// actions
export const {addOrganization, removeOrganization, editOrganization} = organizationSlice.actions

// selectors
export const selectOrganizations = (state: RootState) => state.organizations.organizations

export default organizationSlice.reducer
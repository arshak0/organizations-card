import React, {useState} from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import NumberDropDown from "../NumberDropDown";
import OrganizationChangeModal from "../OrganizationChangeModal";
import {BASE_IMG_SIZE, BASE_FIELD_WIDTH} from "../../constants";

export default function OrganizationCard (props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const [trackingAssigned, setTrackingAssigned] = useState(props.card.tr_assign);
    const [protectionAssigned, setProtectionAssigned] = useState(props.card.pr_assign);

    const handleTrackingAssigned = (value) => setTrackingAssigned(parseInt(value));
    const handleProtectionAssigned = (value) => setProtectionAssigned(parseInt(value));

    const handleDeleteCard = () => props.handleDelete(props.card.id)

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleEditCard = (value) => {
        let valueWithId = {...value}
        valueWithId.id = props.card.id
        props.handleEdit(valueWithId)
        setOpenModal((false));
    }


    const handleCloseMenu = () => setAnchorEl(null)
    const handleClickMenu = (event) => setAnchorEl(event.currentTarget)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}} className="Organization-card">
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <img style={{width: BASE_IMG_SIZE, height: BASE_IMG_SIZE}} src={props.card.logo} alt={'org-logo'}/>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold', alignSelf: 'center', marginLeft: 3 }}>
                        {props.card.name}
                    </Typography>
                </Box>
                <IconButton sx={{ padding: 0}}
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                >
                    <MoreVertIcon />
                </IconButton>
                {openModal && <OrganizationChangeModal handleSubmit={handleEditCard} handleClose={handleCloseModal} cardData={props.card}/>}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleCloseMenu}
                >
                    <MenuItem selected onClick={handleOpenModal}>
                        <BorderColorIcon sx={{ color: 'secondary.main', width: BASE_IMG_SIZE, height: BASE_IMG_SIZE}}/>
                        <Typography sx={{marginLeft: 3}} variant="caption">Edit</Typography>
                    </MenuItem>
                    <MenuItem>
                        <SwipeRightAltIcon sx={{ color: 'secondary.main', width: BASE_IMG_SIZE, height: BASE_IMG_SIZE}}/>
                        <Typography sx={{marginLeft: 3}} variant="caption">Go to Organization</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteCard}>
                        <DoNotDisturbAltIcon sx={{ color: 'secondary.main', width: BASE_IMG_SIZE, height: BASE_IMG_SIZE}}/>
                        <Typography sx={{marginLeft: 3}} variant="caption">Delete Organization</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            <Divider sx={{ marginTop: 3, borderColor: 'secondary.main'}}/>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'start', marginTop: 3 }}>
                    Licenses
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '50%'}}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textAlign: 'start' }}>
                        Tracking
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1}}>
                        <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start' }}>
                            In use
                        </Typography>
                        {trackingAssigned >= props.card.tr_in_use &&
                            <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginLeft: 1, color: 'success.main' }} >
                                {props.card.tr_in_use}
                            </Typography>}
                        {trackingAssigned < props.card.tr_in_use &&
                            <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginLeft: 1, color: 'error.main' }} >
                                {props.card.tr_in_use}
                            </Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1}}>
                        <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginTop: 'auto' }}>
                            Assigned
                        </Typography>
                        <NumberDropDown handleChange={handleTrackingAssigned} value={props.card.tr_assign} in_use={props.card.tr_in_use}/>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '50%'}}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textAlign: 'start' }}>
                        Protection
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1}}>
                        <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start' }}>
                            In use
                        </Typography>
                        {protectionAssigned >= props.card.pr_in_use &&
                            <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginLeft: 1, color: 'success.main' }} >
                                {props.card.pr_in_use}
                            </Typography>}
                        {protectionAssigned < props.card.pr_in_use &&
                            <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginLeft: 1, color: 'error.main' }} >
                                {props.card.pr_in_use}
                            </Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1}}>
                        <Typography variant="caption" sx={{ width: BASE_FIELD_WIDTH, textAlign: 'start', marginTop: 'auto' }}>
                            Assigned
                        </Typography>
                        <NumberDropDown handleChange={handleProtectionAssigned} value={props.card.pr_assign} in_use={props.card.pr_in_use}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

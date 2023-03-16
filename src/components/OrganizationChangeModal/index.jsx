import React, {useEffect, useState} from "react";
import {Box, Button, Modal} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as CONSTANTS from "../../constants/constants";
import * as TEXTS from "../../constants/texts";
import {changeOrganizationValidation} from "../../constants/functions";
import CustomFieldBox from "./FieldBox";

export default function OrganizationChangeModal (props) {
    const [openModal, setOpenModal] = useState(true);
    const [newOrgName, setNewOrgName] = useState('');
    const [newTrInUse, setNewTrInUse] = useState(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newTrAssigned, setNewTrAssigned] = useState(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newPrInUse, setNewPrInUse] = useState(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newPrAssigned, setNewPrAssigned] = useState(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [validationError, setValidationError] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({file: '',imagePreviewUrl: ''});
    const handleCloseModal = () => {
        setOpenModal(false);
        setNewOrgName('');
        setNewTrInUse(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewTrAssigned(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewPrInUse(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewPrAssigned(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setValidationError(false);
        setUploadedFile({file: '',imagePreviewUrl: ''});
        props.handleClose(false);
    }

    useEffect(() => {
        if (props.cardData) {
            setNewOrgName(props.cardData.name);
            setNewTrInUse(props.cardData.tr_in_use);
            setNewTrAssigned(props.cardData.tr_assign);
            setNewPrInUse(props.cardData.pr_in_use);
            setNewPrAssigned(props.cardData.pr_assign);
            setUploadedFile({file: props.cardData.logo,imagePreviewUrl: props.cardData.logo})
        }
    },[props.cardData])

    const handleNewOrganizationSubmit = () => {
        if (changeOrganizationValidation (newOrgName, newTrInUse, newTrAssigned, newPrInUse, newPrAssigned)) {
            setOpenModal(false);
            props.handleSubmit(
                {
                    name: newOrgName,
                    tr_in_use: newTrInUse,
                    tr_assign: parseInt(newTrAssigned),
                    pr_in_use: newPrInUse,
                    pr_assign: parseInt(newPrAssigned),
                    logo: uploadedFile.imagePreviewUrl
                })
            handleCloseModal()
        }
        else setValidationError(true)
    }


    const handleImageChangeFile = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setUploadedFile({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: CONSTANTS.CHANGEORG_MODAL_PARAMS.WIDTH, height: CONSTANTS.CHANGEORG_MODAL_PARAMS.HEIGHT, marginLeft: CONSTANTS.CHANGEORG_MODAL_PARAMS.MARGINLEFT, marginTop: CONSTANTS.CHANGEORG_MODAL_PARAMS.MARGINTOP, backgroundColor: 'white.main', borderRadius: CONSTANTS.BASE_BORDER_RADIUS, padding: 3}}>
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="body1">{TEXTS.ADD_NEW}</Typography>
                {validationError && <Typography sx={{textAlign: 'center', fontWeight: 'bold', color: 'error.main'}} variant="caption">
                    {TEXTS.FIELDS_VALIDATION_ERROR}
                </Typography>}
                <Box sx={{marginTop: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <CustomFieldBox type="text" text="Organization name" state={newOrgName} setState={setNewOrgName}/>
                    <CustomFieldBox type="number" text="Tracking: in use" state={newTrInUse} setState={setNewTrInUse}/>
                    <CustomFieldBox type="number" text="Tracking: assigned" state={newTrAssigned} setState={setNewTrAssigned}/>
                    <CustomFieldBox type="number" text="Protection: in use" state={newPrInUse} setState={setNewPrInUse}/>
                    <CustomFieldBox type="number" text="Protection: assigned" state={newPrAssigned} setState={setNewPrAssigned}/>

                    <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', minWidth: CONSTANTS.LARGE_FIELD_WIDTH}} variant="caption">{TEXTS.LOGO_UPLOAD}</Typography>
                        <input className="fileInput"
                               type="file"
                               onChange={(e)=>handleImageChangeFile(e)} />
                    </Box>
                    {uploadedFile.imagePreviewUrl && <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', minWidth: CONSTANTS.LARGE_FIELD_WIDTH}} variant="caption">{TEXTS.LOGO_PREVIEW}</Typography>
                        <img style={{width: CONSTANTS.PREVIEW_IMG_SIZE, height: CONSTANTS.PREVIEW_IMG_SIZE}} alt={'preview-img-logo'}
                             src={uploadedFile.imagePreviewUrl} />
                    </Box>}
                    {validationError &&
                        <Button sx={{marginTop: 4, color: 'error.main'}} type="submit" variant="outlined" onClick={handleNewOrganizationSubmit}>{TEXTS.SUBMIT}</Button>
                    }
                    {!validationError &&
                        <Button sx={{marginTop: 4}} type="submit" variant="outlined" onClick={handleNewOrganizationSubmit}>{TEXTS.SUBMIT}</Button>
                    }
                </Box>

            </Box>



        </Modal>
    );
}

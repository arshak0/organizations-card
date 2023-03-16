import React, {useEffect, useState} from "react";
import {Box, Button, Modal} from '@mui/material';
import Typography from '@mui/material/Typography';
import {PREVIEW_IMG_SIZE, LARGE_FIELD_WIDTH, BASE_BORDER_RADIUS, FIELDS_MINIMUM_NUMBER} from "../../constants";
import {changeOrganizationValidation} from "../../constants/functions";
import CustomFieldBox from "./FieldBox";

export default function OrganizationChangeModal (props) {

    const [openModal, setOpenModal] = useState(true);
    const [newOrgName, setNewOrgName] = useState('');
    const [newTrInUse, setNewTrInUse] = useState(FIELDS_MINIMUM_NUMBER);
    const [newTrAssigned, setNewTrAssigned] = useState(FIELDS_MINIMUM_NUMBER);
    const [newPrInUse, setNewPrInUse] = useState(FIELDS_MINIMUM_NUMBER);
    const [newPrAssigned, setNewPrAssigned] = useState(FIELDS_MINIMUM_NUMBER);
    const [validationError, setValidationError] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({file: '',imagePreviewUrl: ''});
    const handleCloseModal = () => {
        setOpenModal(false);
        setNewOrgName('');
        setNewTrInUse(FIELDS_MINIMUM_NUMBER);
        setNewTrAssigned(FIELDS_MINIMUM_NUMBER);
        setNewPrInUse(FIELDS_MINIMUM_NUMBER);
        setNewPrAssigned(FIELDS_MINIMUM_NUMBER);
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '70vw', height: '96vh', marginLeft: '15vw', marginTop: '2vh', backgroundColor: 'white.main', borderRadius: BASE_BORDER_RADIUS, padding: 3}}>
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="body1">
                    Add new Organization
                </Typography>
                {validationError && <Typography sx={{textAlign: 'center', fontWeight: 'bold', color: 'error.main'}} variant="caption">
                    Please fill all the fields correctly. Note: Fill the assigned fields with a number divisible by 5
                </Typography>}
                <Box sx={{marginTop: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <CustomFieldBox type="text" text="Organization name" state={newOrgName} setState={setNewOrgName}/>
                    <CustomFieldBox type="number" text="Tracking: in use" state={newTrInUse} setState={setNewTrInUse}/>
                    <CustomFieldBox type="number" text="Tracking: assigned" state={newTrAssigned} setState={setNewTrAssigned}/>
                    <CustomFieldBox type="number" text="Protection: in use" state={newPrInUse} setState={setNewPrInUse}/>
                    <CustomFieldBox type="number" text="Protection: assigned" state={newPrAssigned} setState={setNewPrAssigned}/>

                    <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', minWidth: LARGE_FIELD_WIDTH}} variant="caption">
                            Upload a Logo
                        </Typography>
                        <input className="fileInput"
                               type="file"
                               onChange={(e)=>handleImageChangeFile(e)} />
                    </Box>
                    {uploadedFile.imagePreviewUrl && <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', minWidth: LARGE_FIELD_WIDTH}} variant="caption">
                            Logo Preview
                        </Typography>
                        <img style={{width: PREVIEW_IMG_SIZE, height: PREVIEW_IMG_SIZE}} alt={'preview-img-logo'}
                             src={uploadedFile.imagePreviewUrl} />
                    </Box>}
                    { validationError &&
                        <Button sx={{marginTop: 4, color: 'error.main'}} type="submit" variant="outlined" onClick={handleNewOrganizationSubmit}>Submit</Button>
                    }
                    { !validationError &&
                        <Button sx={{marginTop: 4}} type="submit" variant="outlined" onClick={handleNewOrganizationSubmit}>Submit</Button>
                    }
                </Box>

            </Box>



        </Modal>
    );
}

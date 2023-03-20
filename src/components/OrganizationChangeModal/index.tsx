import React, {useEffect, useState} from "react";
import {Box, Button, Modal} from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import * as CONSTANTS from "../../constants/constants";
import * as TEXTS from "../../constants/texts";
import {changeOrganizationValidation} from "../../constants/functions";
import {CustomFieldBoxString, CustomFieldBoxNumber} from "./CustomFieldBox";
import {LARGE_FIELD_WIDTH} from "../../constants/constants";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addOrganization, Organization, editOrganization, selectOrganizations} from "../../store/slice";

interface uploadedfileInterface {
    file: File | string,
    imagePreviewUrl: string
}

export default function OrganizationChangeModal (props:
{ cardData?: Organization, handleClose: () => any }) {

    const organizations = useAppSelector(selectOrganizations);
    const dispatch = useAppDispatch();
    const editCurrentOrganization = (org: Organization) => dispatch(editOrganization(org))
    const addNewOrganization = (org: Organization) => dispatch(addOrganization(org))

    useEffect(() => {
        //console.log(organizations[props.card.id])
    })

    const [openModal, setOpenModal] = useState<boolean>(true);
    const [newOrgName, setNewOrgName] = useState<string>('');
    const [newTrInUse, setNewTrInUse] = useState<number>(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newTrAssigned, setNewTrAssigned] = useState<number>(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newPrInUse, setNewPrInUse] = useState<number>(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [newPrAssigned, setNewPrAssigned] = useState<number>(CONSTANTS.FIELDS_MINIMUM_NUMBER);
    const [validationError, setValidationError] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<uploadedfileInterface>({file: '',imagePreviewUrl: ''});

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewOrgName('');
        setNewTrInUse(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewTrAssigned(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewPrInUse(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setNewPrAssigned(CONSTANTS.FIELDS_MINIMUM_NUMBER);
        setValidationError(false);
        setUploadedFile({file: '',imagePreviewUrl: ''});
        props.handleClose();
    }

    useEffect(() => {
        if (props.cardData) {
            setNewOrgName(props.cardData.name);
            setNewTrInUse(props.cardData.tr_in_use);
            setNewTrAssigned(props.cardData.tr_assign);
            setNewPrInUse(props.cardData.pr_in_use);
            setNewPrAssigned(props.cardData.pr_assign);
            setUploadedFile({file: props.cardData.logo, imagePreviewUrl: props.cardData.logo})
        }
    },[props.cardData])

    const handleNewOrganizationSubmit = () => {
        if (changeOrganizationValidation (newOrgName, newTrInUse, newTrAssigned, newPrInUse, newPrAssigned)) {
            handleCloseModal()
            if ( props.cardData) {
                editCurrentOrganization({
                    id: props.cardData.id,
                    name: newOrgName,
                    tr_in_use: newTrInUse,
                    tr_assign: newTrAssigned,
                    pr_in_use: newPrInUse,
                    pr_assign: newPrAssigned,
                    logo: uploadedFile.imagePreviewUrl
                })
            }
            else {
                addNewOrganization({
                    id: -1,
                    name: newOrgName,
                    tr_in_use: newTrInUse,
                    tr_assign: newTrAssigned,
                    pr_in_use: newPrInUse,
                    pr_assign: newPrAssigned,
                    logo: uploadedFile.imagePreviewUrl
                })
            }
            props.handleClose()
        }
        else setValidationError(true)
    }


    const handleImageChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target.files) return;

        let reader = new FileReader();
        let file = event.target.files[0];

        /*reader.onloadend = () => {
            setUploadedFile({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        //
        https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string/
        //

        reader.readAsDataURL(file)*/
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
                width: { xs: CONSTANTS.CHANGEORG_MODAL_PARAMS.WIDTH_MOB, md: CONSTANTS.CHANGEORG_MODAL_PARAMS.WIDTH},
                height: CONSTANTS.CHANGEORG_MODAL_PARAMS.HEIGHT,
                marginLeft: { xs: CONSTANTS.CHANGEORG_MODAL_PARAMS.MARGINLEFT_MOB, md: CONSTANTS.CHANGEORG_MODAL_PARAMS.MARGINLEFT},
                marginTop: CONSTANTS.CHANGEORG_MODAL_PARAMS.MARGINTOP,
                backgroundColor: 'white.main',
                borderRadius: CONSTANTS.BASE_BORDER_RADIUS, padding: 3
            }}>
                <CloseIcon onClick={handleCloseModal} sx={{position: 'absolute', marginLeft: { xs: '85%', md: '65%'}, cursor: 'pointer'}}/>
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="body1">{TEXTS.ADD_NEW}</Typography>
                {validationError && <Typography sx={{textAlign: 'center', fontWeight: 'bold', color: 'error.main'}} variant="caption">
                    {TEXTS.FIELDS_VALIDATION_ERROR}
                </Typography>}
                <Box sx={{marginTop: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <CustomFieldBoxString text="Organization name" state={newOrgName} setState={setNewOrgName}/>
                    <CustomFieldBoxNumber text="Tracking: in use" state={newTrInUse} setState={setNewTrInUse}/>
                    <CustomFieldBoxNumber text="Tracking: assigned" state={newTrAssigned} setState={setNewTrAssigned}/>
                    <CustomFieldBoxNumber text="Protection: in use" state={newPrInUse} setState={setNewPrInUse}/>
                    <CustomFieldBoxNumber text="Protection: assigned" state={newPrAssigned} setState={setNewPrAssigned}/>

                    <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', marginBottom: { xs: 3, md: 0}, minWidth: { xs: 0, md: LARGE_FIELD_WIDTH}}} variant="caption">{TEXTS.LOGO_UPLOAD}</Typography>
                        <input className="fileInput"
                               type="file"
                               onChange={handleImageChangeFile} />
                    </Box>
                    {uploadedFile.imagePreviewUrl && <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, width: '100%', marginTop: 3}}>
                        <Typography sx={{alignSelf: 'center', minWidth: { xs: 0, md: LARGE_FIELD_WIDTH}, marginBottom: { xs: 3, md: 0}}} variant="caption">{TEXTS.LOGO_PREVIEW}</Typography>
                        <img style={{width: CONSTANTS.PREVIEW_IMG_SIZE, height: CONSTANTS.PREVIEW_IMG_SIZE}} alt={'preview-img-logo'}
                             className='Img-Logo__preview' /*src={uploadedFile.imagePreviewUrl}*/ />
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

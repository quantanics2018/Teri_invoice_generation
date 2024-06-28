import { Button } from '@mui/material';
import { UserActionBtn, CancelBtn , SaveBtn } from '../../assets/style/cssInlineConfig';
const AddUserBtn = ({ adduserFun, value }) => {
    return (
        <Button variant="contained"
            onClick={adduserFun}
            style={UserActionBtn}
        >
            {value == null ? "Add User" : value}
        </Button>
    )
}
const CancelBtnComp = ({ CancelBtnFun, dataBsDismiss , loading}) => {
    return (
        <Button
            variant="outlined"
            onClick={CancelBtnFun}
            style={loading ? {width:'100px'}:CancelBtn}
            data-bs-dismiss={dataBsDismiss}
            disabled ={loading}
        >
            Cancel
        </Button>
    )
}
const SaveBtnComp = ({ SaveBtnFun }) => {
    return (
        <Button variant="outlined"
            onClick={SaveBtnFun}
            style={SaveBtn}>
            Save
        </Button>
    )
}
export { AddUserBtn, CancelBtnComp, SaveBtnComp };

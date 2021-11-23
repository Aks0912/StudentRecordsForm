import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Button from '../components/controls/Button';

export default function ConfirmDialog(props){
    const {confirmDialog, setConfirmDialog} = props;

    return(
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle>
                <div>Delete Record</div>
            </DialogTitle>
            <DialogContent>
                <div>
                    Are you sure you want to delete?
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    text="No"
                    color="default"
                    onClick={()=>{setConfirmDialog({...confirmDialog, isOpen:false})}}/>
                <Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}/>
            </DialogActions>
        </Dialog>
    )
}
import { Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ActionButton from "./controls/ActionButton";

export default function Popup(props){
    const {title, children, openPopup, setOpenPopup} = props;

    return(
        <Dialog open={openPopup}>
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <ActionButton
                        color="secondary"
                        onClick= {()=>setOpenPopup(false)}>
                        <CloseIcon/>
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

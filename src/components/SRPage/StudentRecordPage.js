import './StudentRecordPage.scss';
import '@material/react-layout-grid/index.scss';
import { useState} from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { Table, TableHead, TableBody, TableCell, TableRow, List } from '@material-ui/core';
import {Paper, makeStyles, Divider} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import StudentRecordForm from '../SRForm/StudentRecordForm';
import ActionButton from '../../components/controls/ActionButton';
import Popup from '../Popup';
import ConfirmDialog from '../ConfirmDialog';

const useStyles = makeStyles(theme => ({
    PageContent: {
        width:'80%',
        margin: '0 auto',
        padding: theme.spacing(3)
    }
}))

export default function StudentRecordPage(props){
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [studentRecordForEdit, setStudentRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);    
    const [confirmDialog, setConfirmDialog] = useState({ isOpen:false, title:'', subTitle:''});

    const openInPopup = (item) => {      
        setStudentRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog, isOpen:false
        })
        handleRemoveItem(id);        
    }

    const saveStudentRecordHandler = (studentRecord) => {
        setRecords([...records, studentRecord]);
    }

    const updateStudentRecordHandler = (studentRecord) => {
        let newArr = [...records]
        let index = records.findIndex(x => x.rollNo ===studentRecord.rollNo);
        newArr[index] = studentRecord;
        setRecords(newArr)
        setOpenPopup(false)
    }

    const handleRemoveItem = (id) => {
        setRecords(records.filter(item => item.rollNo !== id));
    };

    return(
        <Paper className={classes.PageContent}>
            <p className="title">Simple Student Records</p>
            <Divider/>
            <Grid>
                <Row>
                    <Cell columns={5}>
                        <StudentRecordForm saveStudentRecord={saveStudentRecordHandler}
                                            studentRecordForEdit={studentRecordForEdit}
                                            source="newRecord" />
                    </Cell>
                    <Cell columns={7}>
                        <div>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FullName</TableCell>
                                        <TableCell align="right">Roll No.</TableCell>
                                        <TableCell align="right">Student Class</TableCell>
                                        <TableCell align="right">Total Subjects</TableCell>
                                        <TableCell align="right">Age</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {records.map((row) => (
                                        <TableRow key={row.rollNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell component="th" scope="row">
                                                {row.fullName}
                                            </TableCell>
                                            <TableCell align="right">{row.rollNo}</TableCell>
                                            <TableCell align="right">{row.studentClass}</TableCell>
                                            <TableCell align="right">{row.totalSubjects}</TableCell>
                                            <TableCell align="right">{row.age}</TableCell>
                                            <TableCell>
                                                <ActionButton
                                                    color = "primary"
                                                    onClick = {() => openInPopup(row)} >
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </ActionButton>
                                            </TableCell>
                                            <TableCell>
                                                <ActionButton
                                                    color = "secondary"
                                                    onClick={()=> {setConfirmDialog({
                                                        isOpen:true,
                                                        title:"Delete Student Record",
                                                        subTitle:"Do you want to delete Student Record?",
                                                        onConfirm:()=>{onDelete(row.rollNo)}
                                                    })}}>
                                                    <CloseIcon fontSize="small"/>
                                                </ActionButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Popup title="Edit Student Record" 
                                    openPopup = {openPopup} 
                                    setOpenPopup = {setOpenPopup} >
                                <StudentRecordForm saveStudentRecord={updateStudentRecordHandler}
                                                   studentRecordForEdit={studentRecordForEdit} 
                                                   source="editRecord"/>
                            </Popup>
                            <ConfirmDialog confirmDialog= {confirmDialog}
                                            setConfirmDialog= {setConfirmDialog}/>
                        </div>
                    </Cell>
                </Row>
            </Grid>
            
        </Paper>
    )
}
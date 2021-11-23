import './StudentRecordForm.scss';
import {useForm, Form} from '../useForm';
import Input from '../controls/Input';
import Button from '../../components/controls/Button';
import { useEffect} from 'react';

const initializeFValues = {
    fullName: '',
    rollNo: '',
    studentClass: '',
    totalSubjects: '',
    age: ''
}

function StudentRecordForm(props){
    const {studentRecordForEdit} = props

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName= values.fullName ? "" : "This field is required."
        if('rollNo' in fieldValues)
            temp.rollNo= values.rollNo?"": "Enter only numbers."
        if('studentClass' in fieldValues)
            temp.studentClass= values.studentClass?"": "This field is required."
        if('totalSubjects' in fieldValues)
            temp.totalSubjects= values.totalSubjects?"": "This field is required."
        if('age' in fieldValues)
            temp.age= values.age?"": "This field is required."
        
        setErrors({
            ...temp
        })

        if(fieldValues == values)
            return Object.values(temp).every(x=> x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        restForm
    } = useForm(initializeFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            props.saveStudentRecord(values);
            restForm();
        }
    }

    useEffect(()=>{
        if(studentRecordForEdit != null){
                setValues({...studentRecordForEdit
            })
        }
           
    }, [studentRecordForEdit])

    const addButtons = (props.source === "newRecord") ?
         <Button text = "Submit"  type="submit" /> :
         <div>
             <Button text = "Save"  type="submit" /> 
         </div>

    return(
        <Form onSubmit= {handleSubmit}>
            <Input
                name= "fullName"
                label= "Full Name:"
                value= {values.fullName}
                error= {errors.fullName}
                onChange= {handleInputChange} />

            <Input
                name= "rollNo"
                label= "Rollno:"
                value= {values.rollNo}
                error= {errors.rollNo}
                onChange= {handleInputChange} />
                
            <Input
                name= "studentClass"
                label= "Student Class:"
                value= {values.studentClass}
                error= {errors.studentClass}
                onChange= {handleInputChange} />

            <Input
                name= "totalSubjects"
                label= "Total Subjects:"
                value= {values.totalSubjects}
                error= {errors.totalSubjects}
                onChange= {handleInputChange} />

            <Input
                name= "age"
                label= "Age:"
                value= {values.age}
                error= {errors.age}
                onChange= {handleInputChange} />

            <div>
                {addButtons}
            </div>
        </Form>
    )
}

export default StudentRecordForm;
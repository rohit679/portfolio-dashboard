import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    main : {
        display : 'grid',
        gridTemplateColumns : '1fr 1fr 1fr',
        justifyContent : 'center',
        gridColumnGap : '50px',
        gridRowGap : '1.5rem'
    },
    div : {
    },
    input : {
        width : '100%',
    },
    textarea : {
        marginBottom : '-2px',
        width : '100%',
        borderRadius : '0.2rem'
        
    },
    button : {
        marginTop : '0.5rem',
        width : '4.5rem',
        height : '2rem'
    },
    heading : {
        margin : '0',
        color : '#42474f'
    },
    mainHeading : {
        paddingBottom : '0',
        paddingTop : '0',
        fontSize : '1.2rem',
        textShadow: '2px 2px 2px gray',
        color : '#610b20',
        display : 'flex',
        marginTop : '-1.5rem',
        // backgroundColor : 'red',
        justifyContent : 'center'
    }
}));
const Main = ({division, allData, heading}) => {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [inputData, setInputData] = useState(allData);
    const successUpdateNotification = () => toast.success("Data Updated Successfully !", { autoClose: 3000 });
    const errorUpdateNotification = () => toast.error("Data Update error", { autoClose: 3000 });
    const invalidDataNotification = () => toast.info("Input can't be empty", { autoClose: 3000 });

    const onSubmit = (id, e) => {
        e.preventDefault();
        if(inputData[id] === ""){
            invalidDataNotification();
            return;
        }
        const detail = {};
        detail.id = id;
        detail.data = {};
        detail.data.data = inputData[id];
        
        axios.put("http://localhost:8000/content/update-content", detail)
        .then((res)=>{
        console.log("successful");
        successUpdateNotification();
        })
        .catch((err)=>{
        console.log(err);
        errorUpdateNotification();
        })
    };

    const saveInput = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        axios({
            url : '/data.json',
            method : 'get'
        }).then((e) => {
            setData(e.data[division]);
        });
    }, []);

    return (
        <>
        <ToastContainer />
        <div className={classes.mainHeading}>
            <h1>{heading}</h1>
        </div>
        <div className={classes.main}>
            {
                data ? data.map((item, index) => {
                    return(
                        <>
                            <div className={classes.div}>
                            <h3 className={classes.heading}>{item.label}</h3>
                            {item.type === "input" ?
                            <TextField id="outlined-basic" variant="outlined" className={classes.input} 
                            value={inputData ?inputData[item.element_id] : "Data Loading..."} 
                            name = {item.element_id}
                            onChange={e => saveInput(e)}
                            /> :
                            <TextareaAutosize aria-label="minimum height" className={classes.textarea} rowsMin={3.5}
                            value={inputData ?inputData[item.element_id] : "Data Loading..."} 
                            name = {item.element_id}
                            onChange={e => saveInput(e)}
                            />
                            }
                            <Button variant="contained" color="secondary" className={classes.button} 
                            onClick={e => onSubmit(item.element_id, e)}>
                            Update</Button>
                            </div>
                        </>)
                }) : null
            }
        </div>
        </>
    )
}

export default Main;

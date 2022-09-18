import ProminentAppBar from './header'
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import {useEffect, useState} from 'react'
import { FormControl } from '@mui/material';
import Axios from 'axios';
import img from './bmiq.jpg'
export default function Home(props){
    const [gender,setGender] = useState("Male");
    const [height,setHeight] = useState(0);
    const [weight,setWeight] = useState(0);
    const [age,setAge] = useState(0);
    const [bmi, setBmi] = useState()
    const [Status, setStatus] = useState();
    const [resGender,setResGender] = useState("")
    const [resHeight,setResHeight] = useState("")
    const [resWeight,setResWeight] = useState("");
    const [resAge,setResAge] = useState("")
    const [resBmi,setResBmi] = useState("")
    const [resEmail,setResEmail] = useState("")

    const handleChange = (event) =>{
        setGender(event.target.value)
    }
    useEffect(()=>{
        Axios({
            method : 'get',
            url : 'http://localhost:3001/getData',
            params : {
                email : props.email,
            }
        })
        .then((response)=>{
            console.log(response.data[0])
            setResGender(response.data[0].gender)
            setResHeight(response.data[0].height)
            setResWeight(response.data[0].weight)
            setResAge(response.data[0].age)
            setResBmi(response.data[0].bmi)
            setResEmail(response.data[0].email)
        })
    },[bmi])
    const handleSubmit = (event) =>{
        let bmi1 = weight/(height*height);
        let bmii= parseFloat(bmi1).toFixed(2);
        setBmi(bmii)
        if(gender == "Female")
        {
            if(bmii<=18.5){
                setStatus('Underweight')
            }
            else if(bmii>18.5 && bmii<=24.5){
                setStatus('Normal Weight')
            }
            else if(bmii>24.5 && bmii<=29.9){
                setStatus('Overweight')
            }
            else if(bmii>29.9 && bmii<=34.9){
                setStatus('Obese')
            }
            else{
                setStatus('Extreme Obesity')
            }
        }
         Axios({
            method : 'get',
            url : 'http://localhost:3001/sendData',
            params : {
                email : props.email,
                height : height,
                weight : weight,
                age : age,
                gender : gender,
                bmi :bmii
            }
        })
        .then((response)=>{
           alert(response.data.message)

        })
    }
    return(
        <>
        <ProminentAppBar name={props.name}/>
        <div style={{
            display:"flex",
            flexDirection:"row"
        }}>
        <Box
        component="form" 
        sx={{
            width:'30%',
            mt:7,
            ml:10,
            p:2,
            display:'flex',
            flexDirection:'column',
            boxShadow:3
        }}
        display="flex"
        flexDirection="column"
        >
            <Typography component="h1" variant="h5">
              Calculate BMI
            </Typography>
           
                <TextField id="outlined-basic" label="Height" variant="outlined" sx={{mt:3}} onChange={(e)=>{setHeight(e.target.value)}}/>
                <TextField id="outlined-basic" label="Weight" variant="outlined" sx={{mt:3}} onChange={(e)=>{setWeight(e.target.value)}}/>
                <TextField id="outlined-basic" label="Age" variant="outlined" sx={{mt:3}} onChange={(e)=>{setAge(e.target.value)}}/>
                <Select
                        labelId="select"
                        id="selectGender"
                        value={gender}
                        label="Gender*"
                        onChange={handleChange}
                        sx={{mt:3}}
                        
                        >
                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                         </Select>
                <Button variant="contained" sx={{ mb: 3,mt:6,pr:10,pl:10}} onClick={handleSubmit} style={{backgroundColor:'#0f6d85'}}>Calculate</Button>
                <h2>Calculated BMI is {bmi}</h2>
                <h2>{Status}</h2>
            
        </Box>
        <Box sx={{ml:70,boxShadow:3,width:'30%',mt:7}}>
            <Typography component="h1" variant="h3" display="flex" justifyContent="center" alignItems="center" sx={{mb:3,mt:3}}>
              Past BMI
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <div display="flex"
        flexDirection="column">
            <h2>Email : {resEmail}</h2>
            <h2>Height : {resHeight}</h2>
            <h2>Weight : {resWeight}</h2>
            <h2>Height : {resHeight}</h2>
            <h2>Age : {resAge}</h2>
            <h2>Height : {resHeight}</h2>
            <h2>Gender : {resGender}</h2>
            <h2>BMI : {resBmi}</h2>
            </div>
            </Box>
        </Box>
        </div>
        <div style={{marginTop:'11vh'}}>
            <img src={img} style={{width:'100%',height:"70%"}}/>
        </div>
        <div>
            <Box>

            </Box>
        </div>
        {/* <h1>{props.email}</h1> */}
        {/* <h1>{props.name}</h1> */}

        </>
    )
}
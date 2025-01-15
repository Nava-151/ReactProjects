import {  useContext, useRef, useState } from "react"
import { Box, Button, Grid2 as Grid, Modal, TextField } from "@mui/material";
import { UserContext } from "../App";
import Logged from ".//Logged";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const HomePage = () => {
    let url = 'http://localhost:3000/api/user'

    const [isLoginOrReg, setIsLoginOrReg] = useState(false)
    const [logorReg, setLogorReg] = useState('')
    const [userID, setUserID] = useState<number>()
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useContext(UserContext)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)


    //sending the form
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        userDispatch({
            type: 'LOGIN',
            data: {
                userId: 0,
                firstName: nameRef.current?.value || '',
                email: emailRef.current?.value || '',
                lastName: '',
                address: '',
                phoneNumber: '',
                password: passwordRef.current?.value || '',
            }

        });

        console.log("name " + nameRef.current!.value);
        console.log("email " + emailRef.current!.value);
        console.log("pass " + passwordRef.current!.value);

        try {
            const res = await axios.post(
                url + logorReg,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }
            )

            setOpen(false);
            setIsLoginOrReg(true);
            debugger
            setUserID(res.data.userId)
            console.log("user succeeded update "+res.data);
            
        }
        catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error:', e.message);
            }
            else {
                console.error('Unexpected error:(', e);
            }
        }
        finally {
            passwordRef.current!.value = ""
            nameRef.current!.value = ""
            emailRef.current!.value = ""
        }
    }

    const toggleModal = () => {
        setOpen(!open);
    };
    //pressed the login button
    const LoginPressed = () => {
        setLogorReg('/login')
        toggleModal()
    }

    //pressed the register button 
    const RegisterPressed = () => {
        setLogorReg('/register')
        toggleModal()
    }

    return (
        <>
            {/* form regist or login */}
            <Grid container>
                <Grid size={4}>
                    {!isLoginOrReg ?

                        <Button color="primary" variant="contained" onClick={() => LoginPressed()}>Login</Button> :
                        <Logged userId={userID}  />
                    }
                    {!isLoginOrReg ?

                        <Button color="primary" variant="contained" onClick={() => RegisterPressed()}>Register</Button> :
                        <></>
                    }


                </Grid>
            </Grid>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>

                        <TextField label='userName' inputRef={nameRef} />
                        <TextField label='userPassword' inputRef={passwordRef} />
                        <TextField label='userEmail' inputRef={emailRef} />
                        <Button type="submit">Login</Button>
                    </form>
                </Box>
            </Modal>

        </>
    )

}
export default HomePage
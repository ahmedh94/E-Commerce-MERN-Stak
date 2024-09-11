import { Box, Button, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const firstNameRef = useRef<HTMLInputElement>(null);
     const lastNameRef = useRef<HTMLInputElement>(null);
     const emailRef = useRef<HTMLInputElement>(null);
     const passwordRef = useRef<HTMLInputElement>(null);

     const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(firstName, lastName, email, password);

        //make the call to api to create the user
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            })
        })

        if(!response.ok) {
            setError("Unable to register user, please try different cresientials!")
            return;
        }

        const data = await response.json();
        console.log(data);
     }

    

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 4,}}>
                <Typography variant="h4">Register New Account</Typography>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2}}>
                <TextField inputRef={firstNameRef} label="First  Name" name="firstName" />
                    <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
                    <TextField inputRef={emailRef} type="email" label="Email" name="email" />
                    <TextField inputRef={passwordRef} type="password" label="Passwoed" name="password" />
                    <Button onClick={onSubmit} variant="contained">Register</Button>
                    {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
                </Box>
            </Box>
            
        </Container>
    )
}

export default RegisterPage;
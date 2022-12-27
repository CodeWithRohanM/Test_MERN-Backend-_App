import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {

    const navigate = useNavigate();

    const [logInData, setLogInData] = useState({
        email: "",
        password:"",
    });

    const getUserLogInDetails = (event) =>{
        const getName = event.target.name;
        const getValue = event.target.value;

        setLogInData((prevValue)=>{
            return {
                ...prevValue,
                [getName]: getValue,
            }
        })
    }

    const verifyUser = async (event) =>{
        try{
            event.preventDefault();
            const getEmail = logInData.email;
            const getPassword = logInData.password;

            console.log("Email = "+getEmail);
            console.timeLog("Password = "+getPassword);


            const data = await fetch("/logIn", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email: getEmail,
                    password: getPassword,
                })
            });

            const response = await data.json();
            if(response.status === 404)
            {
                console.log("Wrong Details");
            }
            else
            {
                navigate("/");
                console.log("Logged INNNNN");
            }


        }catch(err){
            console.log(err);
        }
    }






    return <>
        <div className="w-full h-screen flex" id="logIn">
            <img src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                alt="background" className="object-cover object-center h-screen w-7/12"/>
                <div className="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg">
                    <h1 className="text-3xl font-bold text-orange-500 mb-2">LOGIN</h1>
                    <div className="w-1/2 text-center">
                        <form method="POST">
                            <input type="text" name="email" placeholder="Your Email.." autocomplete="off" onChange={getUserLogInDetails} value={logInData.email}
                                className="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"/>
                                <input type="password" name="password" placeholder="Your Password.." autocomplete="off" onChange={getUserLogInDetails} value={logInData.password}
                                    className="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"/>
                                    <button type="submit"
                                        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow" onClick={verifyUser}>Sign
                                        In</button>
                                </form>
                    </div>
                </div>
        </div>

            </>

};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegistrationPage() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
    });


    const getUserDetails = (event) => {
        const getName = event.target.name;
        const getValue = event.target.value;

        setUserData((prevValue) => {
            //FIRST APPROACH
            // if(getName === "firstName")
            // return {
            //     firstName: getValue,
            //     lastName: prevValue.lastName,
            // }
            // else if(getName === "lastName")
            // return {
            //     firstName: prevValue.firstName,
            //     lastName: getValue,
            // }


            //SECOND APPROACH (SIMPLER VERSION)
            return {
                ...prevValue, //storing all the previous values in respective fields
                [getName]: getValue, //matching the name field and if found, storing the value into it
            }

        });
    }


    const sendUserDetails = async (event) => {
        try {
            event.preventDefault();
            console.log(userData.firstName);
            console.log(userData.lastName);


            const getFirstName = userData.firstName;
            const getLastName = userData.lastName;
            const getEmail = userData.email;
            const getPassword = userData.password;
            const getConfirmPassword = userData.confirmPassword;
            const getMobile = userData.mobile;

            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: getFirstName,
                    lastName: getLastName,
                    email: getEmail,
                    password: getPassword,
                    confirmPassword: getConfirmPassword,
                    mobile: getMobile,
                })
            });

            const response = await data.json();
            if (response.status === 404) {
                window.alert("Something Went Really Wrong....");
            }
            else {
                navigate("/");
                window.alert("Registration Successful, Partyyy.... 😸");
            }
        } catch (err) {
            console.log(err);
        }

    }



    // Setting Gradient Background to Button & Half-Web Page..
    const setBackgroundGradient = {
        backgroundImage: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"

    }

    return <>
        <section className="h-full gradient-form bg-gray-200 h-screen container mx-auto mt-16" id="register">
            <div className="container py-4 px-6 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <div className="md:p-12 md:mx-6">
                                        <div className="text-center">
                                            <img className="mx-auto w-48"
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo" />
                                            <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">We are The Lotus Team</h4>
                                        </div>
                                        <form method="POST">
                                            <p className="mb-4">Please Create Your Account..</p>
                                            <div className="mb-4">
                                                <input type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Your First Name.." name="firstName" value={userData.firstName} onChange={getUserDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <input type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Your Last Name.." value={userData.lastName} name="lastName" onChange={getUserDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <input type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Your Email.." name="email" value={userData.email} onChange={getUserDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <input type="password"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Your Password.." name="password" value={userData.password} onChange={getUserDetails} />
                                            </div>
                                            <div className="mb-4">
                                                <input type="password"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Confirm Password.." name="confirmPassword" value={userData.confirmPassword} onChange={getUserDetails} />
                                            </div>
                                            <div className="mb-8">
                                                <input type="number"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    placeholder="Mobile.." name="mobile" value={userData.mobile} onChange={getUserDetails} />
                                            </div>
                                            <div className="text-center pt-1 mb-6 pb-1">
                                                <button
                                                    className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                    type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light"
                                                    style={setBackgroundGradient} onClick={sendUserDetails}>
                                                    Register Now
                                                </button>
                                                <a className="text-gray-500" href="#!">Forgot password?</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                    style={setBackgroundGradient}>
                                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                        <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
};
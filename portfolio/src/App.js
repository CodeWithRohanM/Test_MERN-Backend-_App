import React from "react";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import AboutUsPage from "./Components/AboutUsPage";
import ContactPage from "./Components/ContactPage";
import RegistrationPage from "./Components/RegistrationPage";
import LogInPage from "./Components/LogInPage";
import ErrorPage from "./Components/ErrorPage";
import {Routes, Route } from "react-router-dom";

export default function App() {

  return <>

      <Header />

      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/about" element={<AboutUsPage />}></Route>
        <Route exact path="/contact" element={<ContactPage />}></Route>
        <Route exact path="/logIn" element={<LogInPage />}></Route>
        <Route exact path="/registrationPage" element={<RegistrationPage />}></Route>
        <Route path = "*" element = {<ErrorPage/>}></Route>
      </Routes>


  </>
};


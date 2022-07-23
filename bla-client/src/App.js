import React from "react";
import "./App.css"

import Layout from "./components/box/Layout";
import Directory from "./components/pages/gen/Directory";
import Settings from "./components/pages/gen/Settings";
import Unauthorized from "./components/pages/gen/Unauthorzied";
import Home from './components/pages/gen/Home'
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import EmailLogIn from './components/pages/auth/EmailLogIn';
import UserProfile from './components/pages/suite/UserProfile';
import AuthorProfile from './components/pages/suite/AuthorProfile';
import AdminProfile from './components/pages/suite/AdminProfile';
import DataHub from './components/hubs/DataHub';
import RequireAuth from './context/RequireAuth';
import PersistLogin from './context/PersistLogin'
import ROLES_LIST from './context/RolesList';
import Error from './components/pages/gen/Error';

import { Routes, Route } from 'react-router-dom';

function App() {

    return (
       
             
                <Routes>
                    <Route path="/" element={<Layout/>}>

                {/* Public Routes */}
                   <Route exact path="/home" element={<Home/>} /> 
                   <Route path="/signIn" element={<SignIn/>} />
                   <Route path="/signUp" element={<SignUp/>} />
                   <Route path="emailLogin" element={<EmailLogIn/>} />
                   <Route path="/directory" element={<Directory/>} />
                   <Route path="/unauthorized" element={<Unauthorized/>} />

                {/* Private Routes */}
                <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
                    <Route exact path="/userProfile" element={<UserProfile/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Author]}/>}>
                    <Route exact path="/authorProfile" element={<AuthorProfile/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]}/>}>
                    <Route exact path="/adminProfile" element={<AdminProfile/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]}/>}>
                    <Route path='/dataHub' element={<DataHub/>} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
                    <Route path='/settings' element={<Settings/>} />
                </Route>
                </Route>
                                 
                   <Route path="*" element={<Error/>} />
                </Route>
                </Routes>
            
         
    )
};

export default App;
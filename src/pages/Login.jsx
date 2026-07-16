import { useState } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import api from "../api/axios";

import "../styles/auth.css";



function Login(){


    const navigate = useNavigate();


    const { login } = useAuth();



    const [message,setMessage] = useState("");

    const [loading,setLoading] = useState(false);



    const [formData,setFormData] = useState({

        email:"",
        password:""

    });





    const handleChange = (e)=>{


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };






    const handleSubmit = async(e)=>{


        e.preventDefault();



        try{


            setLoading(true);

            setMessage("");



            console.log(formData);



            const response = await api.post(

                "/login",

                formData

            );





            login(

                response.data.user,

                response.data.access_token

            );




            navigate("/dashboard");



        }


        catch(error){



            console.log(error.response);



            if(error.response?.data?.message){


                setMessage(

                    error.response.data.message

                );


            }

            else{


                setMessage(

                    "Login failed"

                );


            }



        }


        finally{


            setLoading(false);


        }



    };






    return (


        <div className="auth-container">



            <div className="auth-card">



                <h2 className="auth-title">

                    Welcome Back 👋

                </h2>




                {

                    message &&

                    (

                        <div className="alert alert-danger">

                            {message}

                        </div>

                    )

                }





                <form onSubmit={handleSubmit}>





                    <div className="input-group-custom">


                        <FaEnvelope className="input-icon"/>



                        <input


                            type="email"


                            name="email"


                            placeholder="Email Address"


                            value={formData.email}


                            onChange={handleChange}


                            required


                        />


                    </div>







                    <div className="input-group-custom">


                        <FaLock className="input-icon"/>



                        <input


                            type="password"


                            name="password"


                            placeholder="Password"


                            value={formData.password}


                            onChange={handleChange}


                            required


                        />


                    </div>







                    <button


                        className="auth-btn"


                        disabled={loading}


                    >



                        {

                            loading

                            ?

                            "Logging in..."

                            :

                            "Login"

                        }



                    </button>





                </form>







                <div className="auth-link">



                    Don't have an account?



                    <Link to="/register">


                        Register


                    </Link>



                </div>






            </div>




        </div>


    );


}



export default Login;
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axios";

import "../styles/auth.css";


function Register(){


    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        password_confirmation: ""

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e)=>{

        e.preventDefault();


        try {


            setLoading(true);

            setMessage("");



            const response = await api.post(
                "/register",
                formData
            );



            setMessage(response.data.message);



            setFormData({

                name: "",
                email: "",
                password: "",
                password_confirmation: ""

            });



        } catch(error){


            console.log(error.response);



            if(error.response?.data?.message){

                setMessage(error.response.data.message);

            }
            else{

                setMessage("Registration failed");

            }



        } finally {


            setLoading(false);


        }


    };



    return (

        <div className="auth-container">


            <div className="auth-card">


                <h2 className="auth-title">

                    Create Account 🚀

                </h2>



                {
                    message && (

                        <div className="alert alert-success">

                            {message}

                        </div>

                    )
                }



                <form onSubmit={handleSubmit}>


                    <div className="input-group-custom">

                        <FaUser className="input-icon"/>

                        <input

                        type="text"

                        name="name"

                        placeholder="Full Name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                        />

                    </div>





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





                    <div className="input-group-custom">

                        <FaLock className="input-icon"/>

                        <input

                        type="password"

                        name="password_confirmation"

                        placeholder="Confirm Password"

                        value={formData.password_confirmation}

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

                            "Creating Account..."

                            :

                            "Register"

                        }


                    </button>



                </form>





                <div className="auth-link">


                    Already have an account?


                    <Link to="/login">

                        Login

                    </Link>


                </div>



            </div>


        </div>

    );


}


export default Register;
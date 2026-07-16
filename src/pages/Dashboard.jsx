import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Dashboard(){

    const { user, logout } = useAuth();

    const navigate = useNavigate();



   const logoutUser = async ()=>{


    await logout();


    navigate("/login");


};



    return (

        <div className="container mt-5">


            <div className="card shadow p-5">


                <h1 className="mb-4">

                    Welcome {user?.name} 🎉

                </h1>


                <hr />


                <h5>

                    Email: {user?.email}

                </h5>



                <button

                    className="btn btn-danger mt-4"

                    onClick={logoutUser}

                >

                    Logout

                </button>


            </div>


        </div>

    );

}


export default Dashboard;
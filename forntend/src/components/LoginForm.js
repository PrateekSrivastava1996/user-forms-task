import React, { useState } from 'react';
import { Form, Button, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices"
import toast from "toastr";

const LoginForm = () => {
     toast.options = { preventDuplicates: true };
     const navigate = useNavigate()
     const [userName, setUserName] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState([]);

     const Validate = () => {
          let err = true;

          if (!userName || userName.trim() === "") {
               setError({ userName: "Required user name" });
               return (err = false);
          } else if (!password || password.trim() === "") {
               setError({ password: "Required password" });
               return (err = false);
          }
          return err;
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (Validate()) {
               const data = { userName, password }
               const resp = await loginUser(data)
               setError({})
               if (resp.status === 200) {
                    toast.success(resp?.data?.message);
                    localStorage.setItem("token", JSON.stringify(resp?.data?.data?.token))
                    localStorage.setItem("userData", JSON.stringify(resp?.data?.data?.user))
                    navigate("/dashboard")
               } else if (resp.status === 400) {
                    toast.error(resp?.data?.message);
               } else {
                    toast.error("Something went wrong");
               }
               console.log(resp?.data, ":::login");
          }
     };

     return (
          <Form onSubmit={handleSubmit}>
               <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                         type="text"
                         placeholder="Enter email"
                         value={userName}
                         name="userName"
                         onChange={(e) => setUserName(e.target.value)}
                    />
               </Form.Group>
               {error && <p style={{ color: "red" }}>{error?.userName}</p>}

               <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                         type="password"
                         placeholder="Password"
                         value={password}
                         name="password"
                         onChange={(e) => setPassword(e.target.value)}
                    />
               </Form.Group>
               {error && <p style={{ color: "red" }}>{error?.password}</p>}

               <Button variant="primary" type="submit">
                    Submit
               </Button>
               <div className="form-field flex100 mb-0">
                    <p className="content-link">
                         Don't have an account!{" "}
                         <Link to="/register"> Sign Up</Link>
                    </p>
               </div>
          </Form>
     );
};

export default LoginForm;

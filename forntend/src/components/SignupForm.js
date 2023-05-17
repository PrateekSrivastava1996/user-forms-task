import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import jsonFileData from './data.json';
import { Link } from 'react-router-dom';
import DatePickerField from './DatePickerField';
import { registerUser } from "../services/authServices"
import toast from "toastr";

const SignupForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState([]);

  const {
    firstName,
    lastName,
    dob,
    gender,
    userName,
    password,
    confirmPassword
  } = userData

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setUserData({ ...userData, dob: date });
  };

  const Validate = () => {
    let err = true;
    const pwd = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    );

    if (!firstName || firstName.trim() === "") {
      setError({ firstName: "Required first name" });
      return (err = false);
    } else if (!lastName || lastName.trim() === "") {
      setError({ lastName: "Required last name" });
      return (err = false);
    } else if (!dob) {
      setError({ dob: "Required DOB" });
      return (err = false);
    } else if (!gender) {
      setError({ gender: "Required gender" });
      return (err = false);
    } else if (!userName || userName.trim() === "") {
      setError({ userName: "Required user name" });
      return (err = false);
    } else if (!password || password.trim() === "") {
      setError({ password: "Required password" });
      return (err = false);
    } else if (!pwd.test(password)) {
      setError({
        password:
          "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.",
      });
      return (err = false);
    } else if (!confirmPassword) {
      setError({ confirmPassword: "Required confirm-password" });
      return (err = false);
    } else if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords does not match" });
      return (err = false);
    }
    return err;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Validate()) {
      // saveUserDataToJson(userData);
      const resp = await registerUser(userData)
      console.log(resp, "::::resp");
      if (resp.status === 200) {
      toast.success(resp?.data?.message);
      } else {
        toast.error(resp?.data?.message || 'Something went wrong');
      }
      setUserData({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        userName: '',
        password: '',
        confirmPassword: '',
      });

      setError({})
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>First name</Form.Label>
        <Form.Control
          name="firstName"
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={handleChange}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.firstName}</p>}

      <Form.Group controlId="formEmail">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          name="lastName"
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={handleChange}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.lastName}</p>}

      <Form.Group controlId="formEmail">
        <Form.Label>Date of birth</Form.Label>
        <DatePickerField selected={dob} onChange={handleDateChange} />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.dob}</p>}

      <Form.Select value={gender} onChange={handleChange} name="gender">
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Form.Select>
      {error && <p style={{ color: "red" }}>{error?.gender}</p>}

      <Form.Group controlId="formPassword">
        <Form.Label>User name</Form.Label>
        <Form.Control
          name="userName"
          type="text"
          placeholder="Enter user name"
          value={userName}
          onChange={handleChange}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.userName}</p>}

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.password}</p>}

      <Form.Group controlId="formPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error?.confirmPassword}</p>}

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
      <div className="form-field flex100 mb-0">
        <p className="content-link">
          Already have an account!{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </Form>
  );
};

export default SignupForm;
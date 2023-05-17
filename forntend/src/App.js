import React from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './HOC/PrivateRoute'
import ProtectedRoute from './HOC/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <LoginForm />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <SignupForm />
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
            exact
          />
        </Routes>
      </Router>
    </>
  )
};

export default App;

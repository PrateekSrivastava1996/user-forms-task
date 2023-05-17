import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
     const [data, setData] = useState("")
     const navigate = useNavigate()
     useEffect(() => {
          const data = JSON.parse(localStorage.getItem("userData"))
          setData(data)
     }, [])

     console.log(data);
     return (
          <div className="card">
               <div className="card-body">
                    <h5 className="card-title">{data?.firstName} {data?.lastName}</h5>
                    <p className="card-text">username:<b> {data?.userName}</b></p>
                    <p className="card-text">gender: <b>{data?.gender}</b></p>
                    <a href="#" className="btn btn-primary" onClick={() => {
                         localStorage.clear()
                         navigate("/")
                    }}>Logout</a>
               </div>
          </div>
     )
}

export default Dashboard
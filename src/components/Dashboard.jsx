import React, { useState, useEffect }  from 'react'
import firebase from '../firebase'
import '../scss/Dashboard.scss'

const Dashboard = () => {
    const [lightone, setLightone] = useState()
    const OnHandeler = () =>{
        firebase.database().ref().update({lightone: 1})
    }
    const OffHandeler = () =>{
        firebase.database().ref().update({lightone: 0})
    }
    useEffect(()=>{
        const getValue = firebase.database().ref("lightone");
        getValue.on("value", data =>{
        setLightone(data.val());
        })

        const lightTwo = firebase.database().ref("lighttwo");
        lightTwo.on("value", data => {
            console.log("lightTwo", data.val())
        } )
    })
    return (
        <div className="Dashboard">
            <h1 className="topTitle">Home Automation</h1>
            <div className="container">
                <div className="leftCon column">
                    <div className="left">
                        <h1 className="title">one</h1>
                        <i className={lightone ? "fas fa-lightbulb yellow" : "fas fa-lightbulb"}></i>
                        <p className="status">{lightone ? "ON" : "OFF"}</p>
                        { lightone ? 
                          <button onClick={OffHandeler}>OFF</button> :
                          <button onClick={OnHandeler}>ON</button> }
                    </div>
                    <div className="right">
                        <h1 className="title">two</h1>
                        <i className="fas fa-lightbulb yellow"></i>
                        <p className="status">On</p>
                        <button>ON</button>
                    </div>
                </div>
                <div className="rightCon column">
                    <div className="left">
                        <h1 className="title">Three</h1>
                        <i className="fas fa-lightbulb yellow"></i>
                        <p className="status">On</p>
                        <button>ON</button>
                    </div>
                    <div className="right">
                        <h1 className="title">Four</h1>
                        <i className="fas fa-lightbulb yellow"></i>
                        <p className="status">On</p>
                        <button>ON</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
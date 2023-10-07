import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import HaveComponent from "./HaveComponent";
import "./Metrics";

const HaveList = () => {

    const haves = useSelector((state) => state);

    const fetchHaves = async () => {
        const response = await axios.get('http://localhost:7777/barterHaves').catch((err) =>{
            console.log ('err', err);
        }
        
        );
    }
    console.log(haves);

    return(
    <div>
        <div className="ui grid container"></div>
        <h1>Have Lists</h1>
        <HaveComponent/>
    </div>
    );
};

export default HaveList;
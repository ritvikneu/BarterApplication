
import React from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import "./Metrics.css";
import Navbar from '../Navbar/Navbar';


const dataLine = [
    { name: '', uv: 0, amt: 0 },
    { name: 'Mon', uv: 2, amt: 2 },
    { name: 'Tue', uv: 0, amt: 0 },
    { name: 'Wed', uv: 4, amt: 4 },
    { name: 'Thu', uv: 3, amt: 3 },
    { name: 'Fri', uv: 7, amt: 7 },
    { name: 'Sat', uv: 4, amt: 4 },
    { name: 'Sun', uv: 9, amt: 9 },
];

const dataPie = [
    { name: 'Trade Incomplete', value: 78 },
    { name: 'Trades Complete', value: 22 },
];

const COLORS = ['#FFBB28','#0088FE','#FF5C5C', '#00C49F' ];

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const Metrics = () => (
    <>
        <Navbar></Navbar>
        <br /><br />
        <div>
            <br />
            {/* <h1>Metrics</h1> */}
            <centre> <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard to view stats of the trades performed on the website</h3></centre>
          
        </div>
        <br />
        <div className="charts-container">
            <div className="line-chart">
                <br />
                <h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Daily Trades of this week</h4>
                <br />
                <LineChart width={600} height={300} data={dataLine}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#FF5F1F" animationDuration={2000} />
                </LineChart>
            </div>

            <div className="pie-chart">
                <br />
                <h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stats for overall trades</h4>
                <br />
                <PieChart width={600} height={300}>
                    <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {dataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </div>


        </div>
    </>
);
export default Metrics;

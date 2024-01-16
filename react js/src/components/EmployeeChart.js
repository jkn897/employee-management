import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["City", "2023 Employee", "2015 Employee"],
    ["Bangalore, BDC", 1524639, 952146],
    ["Hyderabad, HYD", 379200, 369400],
    ["Chennai, CHN", 269500, 289600],
    ["Mumbai, MOM", 209900, 195300],
    ["Pune, PN", 152600, 151700],
];

export const options = {
    title: "City wise Employee",
    chartArea: { width: "50%" },
    hAxis: {
        title: "Total Employees",
        minValue: 0,
    },
    vAxis: {
        title: "City",
    },
    colors: ["rgb(53, 138, 148)", "rgb(40, 34, 70)"]
};

export default function EmployeeChart() {
    return (
        <Chart
            chartType="BarChart"
            width="100%"
            height="270px"
            data={data}
            options={options}
        />
    );
}
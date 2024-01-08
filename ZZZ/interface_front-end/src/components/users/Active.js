import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

const Active = (prop) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Consumption in the date of :" + prop.date,
            },
        },
    };

    const labels = ["00", "01", "02", "03", "04", "05", "06", "08", "09", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Consum',
                data: prop.chartData,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            }
        ],
    };

    return (<div><Bar options={options} data={chartData}/></div>);
}
export default Active;
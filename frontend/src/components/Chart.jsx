"use client"

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'

function PieChart(props) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();

        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: "doughnut",
            data: {
                labels: [
                    'A+',
                    'B+',
                    'O+',
                    'AB+',
                    'A-',
                    'B-',
                    'O-',
                    'AB-'
                ],
                datasets: [{
                    label: 'Dummy Dataset',
                    data: [100, 200, 150, 75, 65, 70, 60, 40],
                    backgroundColor: [
                        '#be123c',
                        '#4f46e5',
                        '#fbbf24',
                        '#64748b',
                        '#f97316',
                        '#7e22ce',
                        '#0d9488',
                        '#fafafa'
                    ],
                    borderColor: ['#1c1c1f', '#1c1c1f', '#1c1c1f', '#1c1c1f', '#1c1c1f', '#1c1c1f', '#1c1c1f', '#1c1c1f' ]
                    // hoverOffset: 4
                }]
            }
        })

        chartInstance.current.resize();

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        }
    }, [])

    return (
        <div className="w-fit h-fit flex flex-col items-center justify-center gap-8" >
            <canvas ref={chartRef} className='h-[350px] w-[350px] micro:h-[350px] micro:w-[350px] nano:w-[250px] nano:h-[250px]'></canvas>
            <p className='text-base text-white'>Blood Group Percentage</p>
        </div>
    )
}

export default PieChart;
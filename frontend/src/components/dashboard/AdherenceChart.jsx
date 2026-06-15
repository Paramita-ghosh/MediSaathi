import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdherenceChart = ({ medications }) => {
    const meds = medications ?? [];
    const [adherenceData, setAdherenceData] = useState({ taken: 0, missed: 0, adherenceRate: 0 });

    useEffect(() => {
    async function fetchAdherence() {
        try {
        // ✅ 1. Get token from localStorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        // ✅ 2. Add Authorization header
        const config = {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        // ✅ 3. Pass config in request
        const { data } = await axios.get(`/api/medications/adherence?t=${Date.now()}`, {
        ...config,
        headers: {
            ...config.headers,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
        });


        setAdherenceData(data);
        } catch (error) {
        console.error("Error fetching adherence:", error);
        }
    }

    fetchAdherence();
    }, [meds.length]);


    const localAdherenceData = {
        taken: 0,
        missed: 0,
    };

    meds.forEach((med) => {
        med.history?.forEach((log) => {
            if (log.status === 'taken') {
                localAdherenceData.taken++;
            } else if (log.status === 'missed') {
                localAdherenceData.missed++;
            }
        });
    });

    const totalDoses = localAdherenceData.taken + localAdherenceData.missed;
    const adherenceRate = totalDoses > 0 ? ((localAdherenceData.taken / totalDoses) * 100).toFixed(0) : 0;

    const combinedTaken = adherenceData.taken ?? localAdherenceData.taken;
    const combinedMissed = adherenceData.missed ?? localAdherenceData.missed;
    const combinedTotal = combinedTaken + combinedMissed;
    const combinedAdherenceRate = adherenceData.adherenceRate ?? (combinedTotal > 0 ? Math.round((combinedTaken / combinedTotal) * 100) : 0);

    const data = {
        labels: ['Taken', 'Missed'],
        datasets: [
            {
                label: 'Doses',
                data: [combinedTaken, combinedMissed],
                backgroundColor: ['#7C3AED', '#334155'], // Accent, Border color
                borderColor: ['#1E293B', '#1E293B'], // Secondary
                borderWidth: 2,
            },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94A3B8', // text-secondary
                    font: {
                        size: 14,
                        family: 'Inter',
                    }
                }
            },
            tooltip: {
                backgroundColor: '#0F172A', // primary
                titleColor: '#F8FAFC', // text-primary
                bodyColor: '#F8FAFC',
                boxPadding: 4,
            }
        },
        cutout: '70%',
    };

    return (
        <div className="relative h-64 w-full flex items-center justify-center">
             {combinedTotal === 0 ? (
                <p className="text-text-secondary">No adherence data yet.</p>
             ) : (
                <>
                    <Doughnut data={data} options={options} />
                    <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold text-text-primary">{combinedAdherenceRate}%</span>
                        <span className="text-sm text-text-secondary">Adherence</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdherenceChart;

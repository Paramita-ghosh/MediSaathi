import React, { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdherenceChart = ({ medications = [], api }) => {
  const [serverStats, setServerStats] = useState(null);

  const localStats = useMemo(() => {
    const totals = { taken: 0, missed: 0 };

    medications.forEach((medication) => {
      medication.history?.forEach((entry) => {
        if (entry.status === 'taken') totals.taken += 1;
        if (entry.status === 'missed') totals.missed += 1;
      });
    });

    return totals;
  }, [medications]);

  useEffect(() => {
    const fetchAdherence = async () => {
      try {
        const { data } = await api.get(`/api/medications/adherence?t=${Date.now()}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });
        setServerStats(data);
      } catch (error) {
        console.error('Error fetching adherence:', error);
        setServerStats(null);
      }
    };

    if (api) fetchAdherence();
  }, [api, medications]);

  const taken = serverStats?.taken ?? localStats.taken;
  const missed = serverStats?.missed ?? localStats.missed;
  const total = taken + missed;
  const adherenceRate =
    serverStats?.adherenceRate ?? (total > 0 ? Math.round((taken / total) * 100) : 0);

  const data = {
    labels: ['Taken', 'Missed'],
    datasets: [
      {
        label: 'Doses',
        data: [taken, missed],
        backgroundColor: ['#7C3AED', '#334155'],
        borderColor: ['#1E293B', '#1E293B'],
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
          color: '#94A3B8',
          font: { size: 14, family: 'Inter' },
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#F8FAFC',
        bodyColor: '#F8FAFC',
        boxPadding: 4,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {total === 0 ? (
        <p className="text-text-secondary">No adherence data yet.</p>
      ) : (
        <>
          <Doughnut data={data} options={options} />
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-text-primary">{adherenceRate}%</span>
            <span className="text-sm text-text-secondary">Adherence</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AdherenceChart;

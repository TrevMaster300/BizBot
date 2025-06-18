/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { LayoutContext } from '../../layout/context/layoutcontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [lineOptions, setLineOptions] = useState({});

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Submitted Applications',
                data: [3, 7, 4, 5, 6, 8, 10],
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: 0.4
            },
            {
                label: 'Approved Applications',
                data: [1, 3, 2, 3, 4, 6, 7],
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: 0.4
            }
        ]
    };

    const applyLightTheme = () => {
        setLineOptions({
            plugins: {
                legend: {
                    labels: { color: '#495057' }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#495057' },
                    grid: { color: '#ebedef' }
                },
                y: {
                    ticks: { color: '#495057' },
                    grid: { color: '#ebedef' }
                }
            }
        });
    };

    const applyDarkTheme = () => {
        setLineOptions({
            plugins: {
                legend: {
                    labels: { color: '#ebedef' }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#ebedef' },
                    grid: { color: 'rgba(160, 167, 181, .3)' }
                },
                y: {
                    ticks: { color: '#ebedef' },
                    grid: { color: 'rgba(160, 167, 181, .3)' }
                }
            }
        });
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') applyLightTheme();
        else applyDarkTheme();
    }, [layoutConfig.colorScheme]);

    const dummyApplications = [
        {
            id: 1,
            applicant: 'Sheila Daniels',
            suburb: 'Bonteheuwel',
            language: 'Afrikaans',
            type: 'Food Hawker',
            status: 'Pending'
        },
        {
            id: 2,
            applicant: 'Sipho Nkosi',
            suburb: 'Khayelitsha',
            language: 'isiXhosa',
            type: 'Hair Salon',
            status: 'Approved'
        },
        {
            id: 3,
            applicant: 'Jade Smith',
            suburb: 'Claremont',
            language: 'English',
            type: 'Mobile Massage',
            status: 'Rejected'
        }
    ];

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4 text-900 font-semibold">Recent Applications</h5>
                    <div className="overflow-auto">
                        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Applicant</th>
                                    <th className="p-3">Suburb</th>
                                    <th className="p-3">Language</th>
                                    <th className="p-3">Business Type</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyApplications.map((app) => (
                                    <tr key={app.id} className="bg-white shadow-sm border-round">
                                        <td className="p-3">{app.id}</td>
                                        <td className="p-3">{app.applicant}</td>
                                        <td className="p-3">{app.suburb}</td>
                                        <td className="p-3">{app.language}</td>
                                        <td className="p-3">{app.type}</td>
                                        <td className="p-3">
                                            <span
                                                className={`text-sm font-medium px-2 py-1 border-round ${
                                                    app.status === 'Approved'
                                                        ? 'bg-green-100 text-green-700'
                                                        : app.status === 'Rejected'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card mt-5">
                    <h5 className="mb-4 text-900 font-semibold">Application Trends</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

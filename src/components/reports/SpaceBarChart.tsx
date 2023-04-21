import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const colors = ['#C0C0C0', '#FDD835', '#00B0FF', '#00C853', '#FF1744'];

type props = {
    data: {
        name: string,
        task: number
    }[]
}

const SpaceBarChart: React.FC<props> = ({ data }) => {

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="task">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>


        </div>
    );
}

export default SpaceBarChart;

import React, { useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { mockAnalytics } from '../../utils/mockData';
import { animateChart } from '../../animations/gsapHelpers';
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-card-hover text-xs transition-colors">
        <p className="font-semibold text-text-primary mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-text-secondary">{p.name}:</span>
            <span className="font-medium text-text-primary">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const WeeklyBarChart = () => {
  const ref = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    animateChart(ref.current, 0.1);
  }, []);

  return (
    <div ref={ref}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={mockAnalytics.weeklyData} barSize={20} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#F1F5F9'} vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
            width={24}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDarkMode ? '#1E293B' : '#F8FAFC' }} />
          <Bar dataKey="taken" name="Taken" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="missed" name="Missed" fill="#EF4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AdherenceDonutChart = () => {
  const ref = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    animateChart(ref.current, 0.15);
  }, []);

  return (
    <div ref={ref}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={mockAnalytics.donutData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            stroke={isDarkMode ? '#1E293B' : '#FFFFFF'}
          >
            {mockAnalytics.donutData.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-text-secondary">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

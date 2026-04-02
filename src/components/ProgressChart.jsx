import React from 'react';
import { TrendingDown } from 'lucide-react';
import { ResponsiveContainer, Area, Tooltip, XAxis, YAxis, Scatter, ComposedChart, Dot } from 'recharts';

const ProgressChart = ({ progress }) => {
  if (!progress || progress.length === 0) return null;

  return (
    <section className="glass-card overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingDown size={20} className="text-[#FDFBF7]" />
          <h3 className="uppercase text-xs font-bold tracking-widest text-[#FDFBF7]/90">Weight Monitoring Progress</h3>
        </div>
        <div className="text-xs font-black text-[#FDFBF7]/60 bg-[#0D3B66] px-4 py-2 rounded-full border border-[#FDFBF7]/20">
          Current Weight: <span className="text-[#FDFBF7] font-black">{progress[progress.length - 1].Weight} KG</span>
        </div>
      </div>
      
      <div className="h-[320px] w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={progress} margin={{ top: 10, left: 10, right: 10, bottom: 40 }}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0D3B66', border: '1px solid rgba(250,240,202,0.2)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff', fontWeight: 800, fontSize: '12px' }}
              cursor={{ stroke: 'rgba(250,240,202,0.2)', strokeWidth: 2 }}
            />
            <XAxis 
              dataKey="Date" 
              type="category" 
              stroke="#475569" 
              fontSize={10} 
              fontWeight={700} 
              axisLine={false} 
              tickLine={false} 
              dy={15}
            />
            <YAxis 
              domain={['dataMin - 5', 'dataMax + 5']} 
              stroke="#475569" 
              fontSize={10} 
              fontWeight={700}
              axisLine={false} 
              tickLine={false}
              dx={-10}
              allowDecimals={true}
            />
            <Area 
              type="monotone" 
              dataKey="Weight" 
              stroke="var(--color-primary)" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorWeight)" 
              animationDuration={1500} 
            />
            <Scatter 
              dataKey="Weight" 
              fill="#fff" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              shape={<Dot r={5} />} 
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
        {progress.length === 1 && (
          <p className="text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-6">Single baseline recorded - awaiting sequential data for trends</p>
        )}
      </div>
    </section>
  );
};

export default ProgressChart;

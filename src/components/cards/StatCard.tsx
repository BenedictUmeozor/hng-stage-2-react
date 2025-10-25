import type { StatCardProps } from '@/types';

const StatCard = ({ icon, label, count, colorClass }: StatCardProps) => {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div className={`mb-3 ${colorClass}`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{count}</p>
    </div>
  );
};

export default StatCard;

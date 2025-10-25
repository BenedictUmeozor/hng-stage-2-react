import type { FeatureCardProps } from "@/types";

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
      <div className="mb-4 text-blue-500">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

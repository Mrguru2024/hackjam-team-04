import React from "react";

export interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  return score;
}

function getStrengthLabel(score: number) {
  switch (score) {
    case 0:
    case 1:
      return { label: "Very Weak", color: "bg-red-500" };
    case 2:
      return { label: "Weak", color: "bg-orange-400" };
    case 3:
      return { label: "Medium", color: "bg-yellow-400" };
    case 4:
      return { label: "Strong", color: "bg-green-500" };
    case 5:
      return { label: "Very Strong", color: "bg-blue-500" };
    default:
      return { label: "", color: "bg-gray-300" };
  }
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const score = getStrength(password);
  const { label, color } = getStrengthLabel(score);
  const percent = (score / 5) * 100;

  return (
    <div className="w-full mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Password Strength</span>
        <span className={`text-xs font-bold ${color} bg-opacity-20 px-2 py-0.5 rounded`}>{label}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength; 
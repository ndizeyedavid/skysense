import React from "react";

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textColor?: string;
  text?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 140,
  strokeWidth = 4,
  circleColor = "#e6e6e6",
  progressColor = "#2196f3",
  text = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Only half of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size / 2 }}>
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circleColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          transform={`rotate(-180 ${size / 2} ${size / 2})`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-180 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: `${size / 6}px`,
        }}
      >
        {text == "" ? `${Math.round(progress)}%` : text}
      </div>
    </div>
  );
};

export default CircularProgressBar;

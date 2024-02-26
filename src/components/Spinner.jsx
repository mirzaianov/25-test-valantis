export default function Spinner() {
  const hue = 352;
  const saturation = 61;
  const lightness = 40;
  const circle1 = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const circle2 = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
  const circle3 = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`;
  const circle4 = `hsl(${hue}, ${saturation}%, ${lightness + 30}%)`;
  const circle5 = `hsl(${hue}, ${saturation}%, ${lightness + 40}%)`;
  const circle6 = `hsl(${hue}, ${saturation}%, ${lightness + 45}%)`;

  return (
    <svg
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.0"
      width="128px"
      height="128px"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
    >
      <g>
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle1}
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle2}
          transform="rotate(45,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle3}
          transform="rotate(90,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle4}
          transform="rotate(135,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle5}
          transform="rotate(180,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle6}
          transform="rotate(225,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle6}
          transform="rotate(270,64,64)"
        />
        <circle
          cx="16"
          cy="64"
          r="16"
          fill={circle6}
          transform="rotate(315,64,64)"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64;0 64 64"
          calcMode="discrete"
          dur="640ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
}

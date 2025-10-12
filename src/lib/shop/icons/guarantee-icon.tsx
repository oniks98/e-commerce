import { SVGProps } from 'react';

const GuaranteeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="50" fill="#FFBC57" />
    <g transform="translate(15, 15) scale(3)">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default GuaranteeIcon;

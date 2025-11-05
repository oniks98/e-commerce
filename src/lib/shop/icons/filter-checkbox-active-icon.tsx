import { SVGProps } from 'react';

const FilterCheckboxActiveIcon = ({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.6 0H2.4C1.76348 0 1.15303 0.252856 0.702944 0.702944C0.252856 1.15303 0 1.76348 0 2.4V13.6C0 14.2365 0.252856 14.847 0.702944 15.2971C1.15303 15.7471 1.76348 16 2.4 16H13.6C14.2365 16 14.847 15.7471 15.2971 15.2971C15.7471 14.847 16 14.2365 16 13.6V2.4C16 1.76348 15.7471 1.15303 15.2971 0.702944C14.847 0.252856 14.2365 0 13.6 0Z"
      fill="#00aeef"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 8.5L6.5 11.5L12.5 5.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterCheckboxActiveIcon;

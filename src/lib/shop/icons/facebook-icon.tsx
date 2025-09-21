interface FacebookIconProps {
  className?: string;
  backgroundColor?: string;
}

const FacebookIcon = ({
  className,
  backgroundColor = 'white',
}: FacebookIconProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="20" r="16" fill={backgroundColor} />
    <path
      d="M25.44 12.16H22.72C22.24 12.16 21.6 12.8 21.6 13.12V16H25.44C25.28 18.08 24.96 20.16 24.96 20.16H21.6V32.32H16.48V20.16H14.08V16H16.48V12.64C16.48 12 16.32 8 21.6 8H25.28V12.16H25.44Z"
      fill="#1778D0"
    />
  </svg>
);

export default FacebookIcon;

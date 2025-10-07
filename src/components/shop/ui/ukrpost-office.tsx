import Image from 'next/image';

interface UkrpostOfficeProps {
  width?: number;
  height?: number;
  className?: string;
}

const UkrpostOffice = ({
  width = 80,
  height = 80,
  className = '',
}: UkrpostOfficeProps) => {
  return (
    <Image
      src="/images/ukrpost-office.png"
      alt="Ukrpost Office"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default UkrpostOffice;

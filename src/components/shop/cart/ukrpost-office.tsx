import Image from 'next/image';

interface UkrpostOfficeProps {
  width?: number;
  height?: number;
  className?: string;
}

const UkrpostOffice = ({
  width = 55,
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
      style={{ objectFit: 'contain' }}
    />
  );
};

export default UkrpostOffice;

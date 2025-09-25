import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width = 80, height = 80, className = '' }: LogoProps) => {
  return (
    <Link href="/" aria-label="Home" className={`shrink-0 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
};

export default Logo;

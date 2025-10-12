import clsx from 'clsx';
import StarRating from './star-rating';

interface ReviewsHeaderProps {
  productName: string;
  totalReviews: number;
  averageRating: number;
}

const ReviewsHeader = ({
  productName,
  totalReviews,
  averageRating,
}: ReviewsHeaderProps) => {
  const titleStyles = clsx(
    'mb-8 text-center text-4xl font-semibold leading-tight text-dark',
    'md:text-left',
  );

  const statsContainerStyles = clsx(
    'flex flex-col gap-4 py-5',
    'md:mb-8 md:flex-row md:items-center md:gap-[195px]',
  );

  const statItemStyles = 'flex items-center gap-2.5';

  return (
    <div>
      <h2 className={titleStyles}>{`Відгуки про ${productName}`}</h2>

      <div className={statsContainerStyles}>
        <div className={statItemStyles}>
          <span className="text-grey text-[17px]">Всього відгуків:</span>
          <span className="text-grey text-[17px]">{totalReviews}</span>
        </div>

        <div className={statItemStyles}>
          <StarRating />
          <span className="text-grey text-[17px]">
            Середня оцінка {averageRating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsHeader;

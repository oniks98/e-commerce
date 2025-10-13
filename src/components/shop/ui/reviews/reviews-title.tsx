interface ReviewsTitleProps {
  className?: string;
}

const ReviewsTitle = ({ className = '' }: ReviewsTitleProps) => {
  return (
    <h2
      className={`text-dark mb-10 text-center text-4xl font-semibold xl:text-left ${className}`}
    >
      Останні відгуки
    </h2>
  );
};

export default ReviewsTitle;

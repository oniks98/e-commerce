import clsx from 'clsx';
import { aboutData } from '@/lib/shop/constants/home/about-data';

const Advantages = () => {
  return (
    <section
      className={clsx(
        'grid grid-cols-2 gap-5 py-10',
        'place-items-center xl:grid-cols-4 xl:gap-5',
      )}
    >
      <ul className="contents">
        {aboutData.advantages.map(({ Icon, title }, index) => (
          <li
            key={index}
            className="flex flex-col items-center md:flex-row md:text-left"
          >
            <div className="mb-5 flex-shrink-0 md:mr-5 md:mb-0">
              <Icon className="h-20 w-20" />
            </div>
            <h4 className="text-dark text-base font-semibold md:text-xl">
              {title}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Advantages;

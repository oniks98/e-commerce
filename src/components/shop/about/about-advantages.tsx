import { aboutAdvantages } from '@/lib/shop/constants/about/about-data';
import AdvantageCheckIcon from '@/lib/shop/icons/advantage-check-icon';

const AboutAdvantages = () => {
  return (
    <section className="flex flex-col items-center py-[80px]">
      <h2 className="mb-[40px] text-center text-4xl font-semibold md:mb-[80px]">
        {aboutAdvantages.title}
      </h2>
      <ul className="grid grid-cols-1 gap-[80px] md:grid-cols-2 md:gap-[30px] xl:grid-cols-4">
        {aboutAdvantages.advantages.map((advantage, index) => (
          <li
            key={index}
            className="flex flex-col items-center gap-[20px] text-center"
          >
            <AdvantageCheckIcon />
            <div className="flex flex-col items-center gap-[10px] text-center">
              <h3 className="text-[26px] font-semibold">{advantage.title}</h3>
              <p className="text-base font-normal">{advantage.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutAdvantages;

import { characteristics } from '@/lib/shop/constants/product/characteristics-data';

const Desc = () => {
  return (
    <section>
      <h2 className="text-dark mb-5 text-center text-4xl font-semibold md:text-left">
        Опис товару
      </h2>
      <div className="text-dark mb-5 text-base">
        <p>
          Модель МК-1 – це ліжко від українського виробника, компанії MegaMebli.
          Вона виготовляється з ДСП та оснащена м&apos;якою спинкою. Також може
          бути виготовлена з дерев&apos;яного щита (сосни). Ламелі виконані з
          бука. Подібна конструкція характеризується надійністю та привабливим
          зовнішнім виглядом.
        </p>
      </div>
      <div>
        <h3 className="text-dark mb-5 text-center text-4xl font-semibold md:text-left">
          Характеристики
        </h3>
        <div className="flex flex-col gap-y-1.5">
          {characteristics.map((char, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-white p-4"
            >
              <span className="text-grey">{char.label}</span>
              <div className="border-grey-light mx-4 flex-grow border-b-2 border-dashed"></div>
              <span className="text-grey">{char.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Desc;

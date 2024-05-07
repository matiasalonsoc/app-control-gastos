import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <img src='/grafico.jpg' alt='Gráfico de gastos' />
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button className='bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg'>
          Resetear App
        </button>

        <AmountDisplay title='Presupuesto' amount={300} />

        <AmountDisplay title='Disponible' amount={420} />

        <AmountDisplay title='Gastado' amount={500} />
      </div>
    </div>
  );
};

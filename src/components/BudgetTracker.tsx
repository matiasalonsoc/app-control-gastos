import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  const { state, totalExpenses, remain, handleReset } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? "red" : "#007bff",
            trailColor: "#f1f1f1",
            textSize: "10px",
          })}
          text={`${percentage.toFixed(0)}% gastado`}
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          onClick={() => handleReset()}
          className='bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg'
        >
          Resetear App
        </button>

        <AmountDisplay title='Presupuesto' amount={state.budget} />

        <AmountDisplay title='Disponible' amount={remain} />

        <AmountDisplay title='Gastado' amount={totalExpenses} />
      </div>
    </div>
  );
};

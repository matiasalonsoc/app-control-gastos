import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export const FilterByCategory = () => {
  const { filterCategory } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterCategory(e.target.value);
  };

  return (
    <div className=' bg-white shadow-lg rounded-lg p-10'>
      <form action=''>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='category'>Filtrar gastos</label>
          <select
            onChange={handleChange}
            id='category'
            className=' bg-slate-100 p-3 flex-1 rounded'
          >
            <option value=''>--Selecciona categoria--</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

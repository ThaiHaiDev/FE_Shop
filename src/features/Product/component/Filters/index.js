
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
import FilterByService from "./FilterByService";

export default function Filters({ filters, onChange }) {

    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;

        const newFilter = {
            ...filters,
            category: newCategoryId
        }
        onChange(newFilter)
    }

    const handlePriceChange = (filterNew) => {
        if (!onChange) return;

        const newFilter = {
            ...filters,
            ...filterNew
        }
        onChange(newFilter)
    }

    return (
        <div>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
            <FilterByService filters={filters} onChange={handlePriceChange} />
        </div>
    )
}
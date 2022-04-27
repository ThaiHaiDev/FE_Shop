
import FilterByCategory from "./FilterByCategory";

export default function Filters({ filters, onChange }) {

    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;

        const newFilter = {
            ...filters,
            category: newCategoryId
        }
        onChange(newFilter)
    }

    return (
        <div>Filters
            <FilterByCategory onChange={handleCategoryChange} />
        </div>
    )
}
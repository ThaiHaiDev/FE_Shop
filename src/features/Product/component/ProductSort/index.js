import { Box, Tab, Tabs } from "@mui/material";

export default function ProductSort({ currentSort, onChange }) {
    // currentSort cua then cha dua xuong de biet o cho nao, neu thang cha truyen xuong ham onChange thi set onChange lai newValue de dua xuong value o tabs
    const handleSortChange = (event, newValue) => {
        if (onChange)
            onChange(newValue)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
                <Tabs value={currentSort} onChange={handleSortChange} aria-label="basic tabs example">
                    <Tab label="Giá thấp đến cao" value="salePrice:asc" sx={{ textTransform: "none" }} ></Tab>
                    <Tab label="Giá cao xuống thấp" value="salePrice:desc" sx={{ textTransform: "none" }} ></Tab>
                </Tabs>
        </Box>
    )
}
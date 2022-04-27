import { useEffect, useState } from 'react'
import categoryApi from '../../../../api/categoryApi'
import styled from 'styled-components'
import { Typography } from '@mui/material';

const Ul = styled.ul`
    padding: 0 10px;
    margin: 0
`;

const Li = styled.li`
    padding: 0 10px;
    list-style-type: none;
    transition: all .25s;
    height: 30px;
    line-height: 25px;
    &:hover {
        cursor: pointer;
        color: red;
        background-color: rgba(0, 0, 0, 0.3);
      }
`;

export default function FilterByCategory({ onChange }) {
    const [listCate, setListCate] = useState([])

    useEffect(() => {
        // Lưu ý phải cho () để hàm async chạy ngay để không lỗi
        (async () => {
            try {

                const data = await categoryApi.getAll()
                setListCate(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleCategoryClick = (category) => {
        if (onChange)
            onChange(category.id)
    }

    return (
        <div>
            <Typography variant='subtitle2' sx={{fontWeight: 'bold', paddingLeft: '10px'}}>DANH MỤC SẢN PHẨM</Typography>
            <Ul>
                {listCate.map(list => (
                    <Li key={list.id} onClick={() => handleCategoryClick(list)}> {list.name} </Li>
                ))}
            </Ul>
        </div>
    )
}
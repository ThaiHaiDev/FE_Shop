import { Box, Link } from "@mui/material";
import { NavLink, Routes, Route } from 'react-router-dom'
import styled from 'styled-components';
import PageAdditional from "./PageProduct/PageAdditional";
import PageDescription from "./PageProduct/PageDescription";
import PageReviews from "./PageProduct/PageReviews";

const Li = styled.li`
    list-style-type: none;
    transition: all .25s;
    width: 300px;
    text-align: center;
    height: 30px;
    line-height: 25px;
    &:hover {
        cursor: pointer;
        color: red;
        background-color: #69f0ae;
        border-bottom: 2px solid red;
      }
`;

export default function ProductMenu({ product }) {
    // Lưu ý, khi router cho component con thì ở component cha có /*, ở Header có phần /:productId/*
    // Ở component con này không có / 
    return (
        <div>
        <Box component="ul" sx={{display:'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}>
            <Li>
                <Link component={NavLink} to='' sx={{textDecoration: 'none'}}>Description</Link>
            </Li>

            <Li>
                <Link component={NavLink} to='additional' sx={{textDecoration: 'none'}}>Additional Information</Link>
            </Li>

            <Li>
                <Link component={NavLink} to='reviews' sx={{textDecoration: 'none'}}>Reviews</Link>
            </Li>
        </Box>
        <Routes>
                <Route path='' element={<PageDescription />} /> 
                <Route path={`additional`} element={<PageAdditional />} />
                <Route path={`reviews`} element={<PageReviews />} />
            </Routes>
        </div>
        


    )

    
    
    
}
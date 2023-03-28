import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchPizzas } from '../../redux/pizzasSlice';
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#FE5F1E',
        },
    },
});

const Paginate = () => {
    //state.posts = {isLoading: true, posts: Array(8), currentPage: 1, numberOfPages: 2}
    const dispatch = useDispatch()
    const { numberOfPages, currentPage } = useSelector((state) => state.pizzas);
    const navigate = useNavigate()

    function handleChange(e, page) {
        dispatch(fetchPizzas(page));
        navigate(`/?page=${page}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    return (
        <>
            {numberOfPages > 1 && (
                <ThemeProvider theme={theme}>
                    <Stack spacing={2}>
                        <Pagination
                            count={numberOfPages}
                            color="secondary"
                            variant='outlined'
                            size="large"
                            page={currentPage}
                            onChange={(e, page) => handleChange(e, page)}
                            defaultPage={currentPage}
                        />
                    </Stack>
                </ThemeProvider>
            )}
        </>
    );
};

export default Paginate;
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import store from '../../store';

const { them: themState } = store.getState()

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: `2px solid ${themState.colors.firstColor}`,

    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#0C1A3E",
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

type Props = {
    placeHolder: string,
    onChange: (term: string) => void
};

const SearchInput: React.FC<Props> = ({ placeHolder, onChange }) => {

    const handelChang = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }


    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{ fill: "#0C1A3E" }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeHolder}
                onChange={handelChang}
                inputProps={{ 'aria-label': 'search' }}

            />
        </Search>
    );
}

export default SearchInput;
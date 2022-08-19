import { styled, IconButton } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main
}));

export default StyledIconButton;

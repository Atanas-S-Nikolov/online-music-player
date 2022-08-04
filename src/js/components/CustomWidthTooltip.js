import { styled, Tooltip, tooltipClasses } from '@mui/material';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: "fit-content",
    },
});

export default CustomWidthTooltip;

import { Box, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

type IconMenuMobileProps = {
    children: React.ReactNode;
}

const IconMenuMobile: React.FC<IconMenuMobileProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box component='div'>
            <IconButton onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: 'background.default',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 1,
                            minWidth: 160,
                        }
                    }
                }}
            >
                {React.cloneElement(children as React.ReactElement, { onClose: handleClose })}
            </Menu>
        </Box>
    )
};

export default IconMenuMobile;
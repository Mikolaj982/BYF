import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
    title: string;
    description: string;
    onConfirm: (id?: string) => void;
    trigger?: React.ReactNode;
    label: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = (
    {
        title,
        description,
        onConfirm,
        trigger,
        label,
    }
) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            {trigger
                ? <Box component='span' onClick={() => setOpen(true)}>
                    {trigger}
                </Box>
                : <Button variant='text' onClick={() => setOpen(true)}>
                    {label}
                </Button>
            }
            <Dialog open={open}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {description}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={() => onConfirm()} variant='contained'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ConfirmDialog;
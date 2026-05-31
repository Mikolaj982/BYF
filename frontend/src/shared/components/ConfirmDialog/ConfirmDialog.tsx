import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
    title: string;
    description: string;
    onConfirm: (id?: string) => void;
    onIconMenuClose?: () => void;
} & (
        | { trigger?: React.ReactNode; label?: never }
        | { trigger?: never; label: string }
    );

const ConfirmDialog: React.FC<ConfirmDialogProps> = (
    {
        title,
        description,
        onConfirm,
        trigger,
        label,
        onIconMenuClose,
    }
) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            {trigger
                ? <Box
                    component='span'
                    onClick={() => setOpen(true)}
                    sx={{ display: 'inline-flex', alignItems: 'center' }}
                >
                    {trigger}
                </Box >
                : <Button variant={label === 'delete' ? 'text' : 'outlined'} onClick={() => setOpen(true)}>
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
                    <Button
                        onClick={() => {
                            setOpen(false);
                            onIconMenuClose?.()
                        }}
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                            onIconMenuClose?.()
                        }}
                        variant='contained'
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ConfirmDialog;
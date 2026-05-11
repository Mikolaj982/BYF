import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

type ConfirmDialogProps = {
    title: string,
    description: string,
    onConfirm: (id?: string) => void,
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, description, onConfirm }) => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
        <Button
            color='error'
            onClick={() => setOpen(true)}
        >
            Delete
        </Button>
        <Dialog open={open}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {description}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button onClick={() => onConfirm()}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default ConfirmDialog
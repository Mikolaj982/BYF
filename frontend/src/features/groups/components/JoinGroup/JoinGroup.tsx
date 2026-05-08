import { Controller, useForm } from 'react-hook-form'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField, Typography } from '@mui/material'
import { joinGroupByCode } from '../../services/joinGroupByCode'
import { MESSAGES } from '../../../../utils/messages'
import { toast } from 'react-toastify'
import { useState } from 'react'

type FormValues = {
    code: string,
}

const JoinGroupForm: React.FC<{ onSuccess: () => Promise<void> }> = ({ onSuccess }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { control, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            code: ''
        },
    });

    const handleInviteCode = async (data: FormValues) => {
        try {
            await joinGroupByCode(data.code);
            toast.success(MESSAGES.SUCCESS.JOINED_GROUP);
            await onSuccess();
            reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    }

    return <>
        <Button onClick={() => setOpen(true)} sx={{ flex: 1 }} variant='outlined'>Join</Button>
        <Dialog open={open}>
            <DialogTitle>Join Group</DialogTitle>
            <DialogContent>
                <Controller
                    name='code'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='podaj kod'
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit(handleInviteCode)} variant='contained'>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
}


export default JoinGroupForm




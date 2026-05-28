import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { joinGroupByCode } from '../../services/joinGroupByCode';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type JoinGroupFormData = {
    code: string;
};

const JoinGroupForm: React.FC = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const { control, handleSubmit, reset } = useForm<JoinGroupFormData>({ defaultValues: { code: '' } });

    const handleInviteCode = async (data: JoinGroupFormData) => {
        try {
            const groupId = await joinGroupByCode(data.code);
            await queryClient.invalidateQueries({ queryKey: ['groups', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['group_members', groupId] });
            toast.success(MESSAGES.SUCCESS.JOINED_GROUP, { toastId: 'join-group-success' });
            setOpen(false);
            reset();
            navigate(`/dashboard/group/${groupId}`);
        } catch (error) {
            toast.error(getErrorMessage(error), { toastId: 'join-group-error' });
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                sx={{ flex: 1 }}
                variant='outlined'
            >
                Join
            </Button>
            <Dialog open={open}>
                <DialogTitle>Join group</DialogTitle>
                <DialogContent>
                    <Controller
                        name='code'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='enter the code'
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant='outlined'>Cancel</Button>
                    <Button onClick={handleSubmit(handleInviteCode)} variant='contained'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default JoinGroupForm;




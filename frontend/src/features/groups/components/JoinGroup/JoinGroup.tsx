import { Controller, useForm } from 'react-hook-form'
import { FormControl, TextField } from '@mui/material'
import { joinGroupByCode } from '../../services/joinGroupByCode'
import { MESSAGES } from '../../../../utils/messages'
import { toast } from 'react-toastify'

type FormValues = {
    code: string,
}

const JoinGroupForm: React.FC<{ onSuccess: () => Promise<void> }> = ({ onSuccess }) => {
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

    return (
        <div className='border-spacing-1'>
            <p>Dołącz do grupy</p>
            <form onSubmit={handleSubmit(handleInviteCode)}>
                <FormControl>
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
                </FormControl>
                <button type='submit'>zatwierdź</button>
            </form>
        </div>
    )
}


export default JoinGroupForm
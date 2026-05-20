import React from 'react'
import { userAuthService } from '../../service/userAuthService';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            await userAuthService.logout();
            toast.success(MESSAGES.SUCCESS.USER_LOGGED_OUT);
            navigate('/');
        } catch (error: unknown) {
            toast.error(getErrorMessage(error));
        };
    };

    return (
        <Button
            onClick={onSubmit}
            sx={{ flex: 1 }}
            variant='outlined'
        >
            LOGOUT
        </Button>
    )
};

export default LogoutButton;
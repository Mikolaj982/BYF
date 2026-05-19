import { Alert } from '@mui/material';
import { getErrorMessage } from '../../../utils/errorUtils/getErrorMessage';

type ErrorStateProps = {
    error: unknown;
};

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
    <Alert severity='error'>{getErrorMessage(error)}</Alert>
)
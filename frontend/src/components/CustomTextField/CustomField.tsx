import React, { forwardRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff, EmailRounded, VerifiedUserRounded } from '@mui/icons-material';

interface CustomFieldProps {
    label: string;
    helperText?: string;
    isPasswordField?: boolean;
    Icon?: React.ElementType;
    error?: boolean;
    inputProps?: React.ComponentProps<'input'>;
};

const CustomField: React.FC<CustomFieldProps> = forwardRef<HTMLInputElement, CustomFieldProps>(
    (
        {
            label,
            helperText,
            Icon,
            error,
            ...inputProps
        },
        ref
    ) => {
        const [passwordVisibility, setPasswordVisibility] = useState<{ password: boolean, confirmPassword: boolean }>({
            password: false,
            confirmPassword: false,
        });
        const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
            setPasswordVisibility((prev) => ({
                ...prev,
                [field]: !prev[field]
            }));
        };
        const isPasswordField: boolean = label?.toLowerCase().includes('password');
        const isUsernameOrEmailField: boolean = label?.toLowerCase() === 'usernameoremail';
        const isUsernameField: boolean = label?.toLowerCase() === 'username';
        const isEmailField: boolean = label?.toLowerCase() === 'email';

        return (
            <FormControl
                variant="filled"
                size="small"
                margin="dense"
                error={error}
            >
                <InputLabel>
                    {isUsernameOrEmailField ? 'username/email' : label}
                </InputLabel>
                <FilledInput
                    ref={ref}
                    {...inputProps}
                    type={
                        isPasswordField ?
                            passwordVisibility?.password
                                ? 'text'
                                : 'password'
                            : 'text'
                    }
                    disableUnderline
                    endAdornment={
                        <>
                            {(isUsernameOrEmailField || isUsernameField) && (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <VerifiedUserRounded />
                                    </IconButton>
                                </InputAdornment>
                            )}
                            {isEmailField && (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <EmailRounded />
                                    </IconButton>
                                </InputAdornment>
                            )}
                            {isPasswordField && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleClickShowPassword('password')}
                                        aria-label="toggle password visibility"
                                    >
                                        {
                                            passwordVisibility?.password ?
                                                <VisibilityOff /> :
                                                <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )}
                        </>
                    }
                />
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        );
    });

export default CustomField;

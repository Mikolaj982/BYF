import React, { forwardRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff, EmailRounded, VerifiedUserRounded } from '@mui/icons-material';

interface CustomInputProps {
    label: string;
    helperText?: string;
    error?: boolean;
    inputProps?: React.ComponentProps<'input'>;
};

const CustomInputField: React.FC<CustomInputProps> = forwardRef<HTMLInputElement, CustomInputProps>(
    (
        {
            label,
            helperText,
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
            setPasswordVisibility((prev) => {
                const newState = { ...prev, [field]: !prev[field] };
                return newState;
            });
        };
        const isPasswordField: boolean = label?.toLowerCase() === 'password';
        const isConfirmPasswordField: boolean = label?.toLowerCase() === 'confirmpassword';
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
                <InputLabel htmlFor={label}>
                    {isUsernameOrEmailField ? 'username/email' : isConfirmPasswordField ? 'confirm password' : label}
                </InputLabel>
                <FilledInput
                    data-testid="custom-input"
                    id={label}
                    ref={ref}
                    {...inputProps}
                    type={
                        isPasswordField
                            ? passwordVisibility.password
                                ? 'text'
                                : 'password'
                            : isConfirmPasswordField
                                ? passwordVisibility.confirmPassword
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
                                        data-testid="toggle-password-visibility"
                                    >
                                        {
                                            passwordVisibility?.password ?
                                                <VisibilityOff /> :
                                                <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )}
                            {isConfirmPasswordField && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleClickShowPassword('confirmPassword')}
                                        aria-label="toggle confirm password visibility"
                                        data-testid="toggle-confirm-password-visibility"
                                    >
                                        {passwordVisibility?.confirmPassword ? <VisibilityOff /> : <Visibility />}
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

export default CustomInputField;

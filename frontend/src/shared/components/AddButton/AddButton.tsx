import React from 'react';
import { IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

type AddButton = {
    handleClick?: () => void,
    className?: string,
    label?: string,
}

const AddButton: React.FC<AddButton> = ({ handleClick, className, label }) => {
    return (
        <IconButton aria-label='add' onClick={handleClick} className={className}>{label ? label : <AddCircleOutline />}</IconButton>
    )
}

export default AddButton
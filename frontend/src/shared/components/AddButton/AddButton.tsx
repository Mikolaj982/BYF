import React from 'react';
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

type AddButton = {
    handleClick?: () => void,
    className?: string,
    label?: string,
}

const AddButton: React.FC<AddButton> = ({ handleClick, className, label }) => {
    return (
        <Button aria-label='add' onClick={handleClick} className={className}>{label ? label : <AddCircleOutline />}</Button>
    )
}

export default AddButton
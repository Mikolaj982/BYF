import { Typography } from '@mui/material';
import React from 'react';

type SectionLabelProps = {
    label: string;
};

const SectionLabel: React.FC<SectionLabelProps> = ({ label }) => {
    return (
        <Typography
            fontSize={14}
            color='text.secondary'
            fontWeight='600'
            marginBottom={2}
        >
            {label.toLocaleUpperCase()}
        </Typography>
    )
};

export default SectionLabel;
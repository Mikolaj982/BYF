import { Stack } from '@mui/material';
import React from 'react';

type SectionContainerProps = {
    children: React.ReactNode;
};

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
    return (
        <Stack padding={2}>{children}</Stack>
    )
};

export default SectionContainer;
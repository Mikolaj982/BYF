import React from 'react';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import JoinGroupForm from '../../../../features/groups/components/JoinGroup/JoinGroup';
import { Stack } from '@mui/material';
import LogoutButton from '../../../../features/auth/components/LogoutButton/LogoutButton';

type SidebarBottomProps = {
    refetchGroups: () => Promise<void>;
};

const SidebarBottom: React.FC<SidebarBottomProps> = ({ refetchGroups }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            sx={{
                padding: 2,
                borderTop: 1,
                borderColor: 'grey.800',
                alignItems: 'stretch',
                gap: 1
            }}
        >
            <CreateGroupForm onSuccess={refetchGroups} />
            <JoinGroupForm onSuccess={refetchGroups} />
            <LogoutButton />
        </Stack>
    )
};

export default SidebarBottom;
import { Stack, Typography } from '@mui/material';

type DesktopHeaderProps = {
    title: string;
    rightContent?: React.ReactNode;
};

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
    title,
    rightContent,
}) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderBottom={1}
            borderColor="divider"
            flexWrap='wrap'
            overflow='hidden'
        >
            <Typography
                variant='h6'
                alignContent='center'
                fontWeight='600'
            >
                {title}
            </Typography>
            {rightContent}
        </Stack>
    );
};

export default DesktopHeader;
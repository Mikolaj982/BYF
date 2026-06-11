import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Stack, Typography } from '@mui/material';

type MobileHeaderProps = {
    title: string;
    onOpenSidebar: () => void;
    rightContent?: React.ReactNode;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
    title,
    onOpenSidebar,
    rightContent,
}) => {
    return (
        <Stack
            direction="row"
            p={2}
            borderBottom={1}
            borderColor="divider"
            flexWrap='wrap'
            overflow='hidden'
        >
            <Stack
                direction="row"
                justifyContent='space-between'
                alignItems="center"
                width='stretch'
                spacing={1}
            >
                <IconButton onClick={onOpenSidebar}>
                    <MenuIcon />
                </IconButton>
                <Typography fontWeight={600}>
                    {title}
                </Typography>
                {rightContent}
            </Stack>
        </Stack>
    );
};

export default MobileHeader;
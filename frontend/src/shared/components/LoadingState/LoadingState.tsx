import { Box, CircularProgress } from "@mui/material"

export const LoadingState: React.FC = () => {
    return <Box component='div' display="flex" justifyContent="center" p={4}>
        <CircularProgress />
    </Box>
};
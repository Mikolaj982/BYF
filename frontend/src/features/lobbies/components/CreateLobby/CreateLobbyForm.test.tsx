import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateLobbyForm from "./CreateLobbyForm";
import { toast } from 'react-toastify';
import { GroupRole } from "../../../groups/types/group.types";
import { createLobby } from "../../services/createLobby";
import { MESSAGES } from "../../../../utils/messages";

jest.mock('../../../auth/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { id: 'test-user-id' }
    })
}));

jest.mock('../../services/createLobby', () => ({
    createLobby: jest.fn().mockResolvedValue('test-group-id')
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Create lobby form component', () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    })

    const groupData = {
        id: 'test-group-id',
        name: 'test-name',
        description: 'test-desc',
        role: GroupRole.Owner,
        inviteCode: 'test-code',
    };

    const renderCreateLobbyForm = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CreateLobbyForm groupData={groupData} />
            </QueryClientProvider>
        )
    };

    it('should render create button on initial load', () => {
        renderCreateLobbyForm();
        expect(
            screen.getByRole('button', { name: /create lobby/i })
        ).toBeInTheDocument();
    });

    it('should fill create lobby data and send request', async () => {
        renderCreateLobbyForm();

        const openCreateLobbyFormBtn = screen.getByRole('button', { name: /create lobby/i });
        fireEvent.click(openCreateLobbyFormBtn);

        await screen.findByRole('dialog', { name: /create lobby/i });

        const nameInput = screen.getByLabelText('name');

        fireEvent.change(nameInput, { target: { value: 'test-name' } });
        expect(nameInput).toHaveValue('test-name');

        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(submitButton);

        await waitFor(() =>
            expect(createLobby).toHaveBeenCalledWith({
                groupId: 'test-group-id',
                owner: 'test-user-id',
                gameType: 'test-name'
            })
        );

        await waitFor(() =>
            expect(screen.queryByRole('dialog'))
                .not.toBeInTheDocument()
        );

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalled()
        );
    });

    it('should show validation error when name is empty', async () => {
        renderCreateLobbyForm();

        fireEvent.click(screen.getByRole('button', { name: /create lobby/i }));

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(MESSAGES.ERROR.LOBBY_NAME_TOO_SHORT))
            .toBeInTheDocument();

        expect(createLobby).not.toHaveBeenCalled();
    });

    it('should show error when createLobby fails', async () => {
        (createLobby as jest.Mock).mockRejectedValueOnce(
            new Error('Server error')
        );

        renderCreateLobbyForm();

        fireEvent.click(screen.getByRole('button', { name: /create lobby/i }));

        fireEvent.change(screen.getByLabelText('name'), { target: { value: 'test-name' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(createLobby).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
        });

        expect(screen.getByRole('dialog', { name: /create lobby/i }))
            .toBeInTheDocument();
    });

});
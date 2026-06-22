import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateMatchForm from './CreateMatchForm';
import { createMatch } from '../../services/createMatch';
import { toast } from 'react-toastify';
import { MemoryRouter, useParams } from 'react-router-dom';
import { useLobbyMembers } from "../../hooks/useLobbyMembers";
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => {
    const orginalModule = jest.requireActual('react-router-dom');
    return {
        ...orginalModule,
        useParams: jest.fn(() => ({ lobbyId: 'test-lobby-id' }))
    }
});

jest.mock('../../hooks/useLobbyMembers', () => ({
    useLobbyMembers: jest.fn(() => ({
        loadingLobbyMembers: false,
        errorLobbyMembers: null,
        lobbyMembers: [
            { userId: 'test-id', username: 'testNameA' },
            { userId: 'test-id-2', username: 'testNameB' }
        ],
    }))
}));

jest.mock('../../services/createMatch', () => ({
    createMatch: jest.fn().mockResolvedValue('test-match-id')
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}));

describe('Create match form component', () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        queryClient = new QueryClient();

        (useParams as jest.Mock).mockReturnValue({ lobbyId: 'test-lobby-id' });

        (useLobbyMembers as jest.Mock).mockReturnValue({
            loadingLobbyMembers: false,
            errorLobbyMembers: null,
            lobbyMembers: [
                { userId: 'test-id', username: 'testNameA' },
                { userId: 'test-id-2', username: 'testNameB' }
            ],
        });
    });

    const renderCreateMatchForm = () => {
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateMatchForm />
                </QueryClientProvider>
            </MemoryRouter>
        )
    };

    it('should render ErrorState for no lobby id', () => {
        (useParams as jest.Mock).mockReturnValueOnce({});

        renderCreateMatchForm();

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should render LoadingState when loading lobby members', () => {
        (useLobbyMembers as jest.Mock).mockReturnValueOnce({
            loadingLobbyMembers: true,
        })

        renderCreateMatchForm();

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render ErrorState for errorLobbyMembers', () => {
        (useLobbyMembers as jest.Mock).mockReturnValueOnce({
            errorLobbyMembers: 'test-error',
        })

        renderCreateMatchForm();

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should fill create match form and send submit request', async () => {
        renderCreateMatchForm();

        const openCreateMatchFormBtn = screen.getByRole('button', { name: /match+/i });
        expect(openCreateMatchFormBtn).toBeInTheDocument();

        fireEvent.click(openCreateMatchFormBtn);
        expect(await screen.findByRole('dialog', { name: /create match/i }));

        const gameNameInput = screen.getByLabelText('Name');

        fireEvent.change(gameNameInput, { target: { value: 'test-name' } });
        expect(gameNameInput).toHaveValue('test-name');

        const participantsInput = screen.getByLabelText('Participants');

        await userEvent.click(participantsInput);

        const firstPlayer = await screen.findByText('testNameA');

        await userEvent.click(firstPlayer);

        await userEvent.click(participantsInput);

        const secondPlayer = await screen.findByText('testNameB');

        await userEvent.click(secondPlayer);

        expect(await screen.findByText('Wyniki')).toBeInTheDocument();

        const firstPlayerScore = await screen.findByLabelText('testNameA');

        fireEvent.change(firstPlayerScore, { target: { value: 1 } });
        expect(firstPlayerScore).toHaveValue(1);

        const secondPlayerScore = await screen.findByLabelText('testNameB');

        fireEvent.change(secondPlayerScore, { target: { value: 2 } });
        expect(secondPlayerScore).toHaveValue(2);


        const createMatchBtn = screen.getByRole('button', { name: /create/i });

        fireEvent.click(createMatchBtn);

        await waitFor(() => expect(createMatch).toHaveBeenCalledWith({
            gameName: 'test-name',
            lobbyId: 'test-lobby-id',
            participants: [
                { user_id: 'test-id', score: 1 },
                { user_id: 'test-id-2', score: 2 },
            ]
        }));

        await waitFor(() =>
            expect(screen.queryByRole('dialog'))
                .not.toBeInTheDocument()
        );

        await waitFor(() => expect(toast.success).toHaveBeenCalled());
    });
});
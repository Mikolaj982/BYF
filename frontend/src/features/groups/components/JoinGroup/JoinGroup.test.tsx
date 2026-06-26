import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import JoinGroupForm from "./JoinGroup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { joinGroupByCode } from '../../services/joinGroupByCode';
import { MESSAGES } from "../../../../utils/messages";

const mockNavigate = jest.fn((url: string) => url);

jest.mock('react-router-dom', () => {
    const orginalModule = jest.requireActual('react-router-dom');

    return {
        ...orginalModule,
        useNavigate: () => mockNavigate,
    }
});

jest.mock('../../../auth/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { id: 'test-user-id' }
    })
}));

jest.mock('../../services/joinGroupByCode', () => ({
    joinGroupByCode: jest.fn().mockResolvedValue('test-group-id'),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}))


describe('Join group form component', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    })

    const renderShowJoinGroupFormBtn = () => {
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <JoinGroupForm />
                </QueryClientProvider>
            </MemoryRouter>
        );
    };

    it('should render JoinGroupForm button', () => {
        renderShowJoinGroupFormBtn();

        expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
    });

    it('should fill join group form and send submit request', async () => {
        jest.mocked(joinGroupByCode).mockResolvedValue('test-group-id');

        renderShowJoinGroupFormBtn();

        const openJoinGroupFormBtn = screen.getByRole('button', { name: /join/i });

        fireEvent.click(openJoinGroupFormBtn);
        expect(await screen.findByRole('dialog', { name: /join group/i }));

        const inviteCodeInput = screen.getByLabelText('enter the code');

        fireEvent.change(inviteCodeInput, { target: { value: 'test-code' } });
        expect(inviteCodeInput).toHaveValue('test-code');

        const joinGroupBtn = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(joinGroupBtn)

        await waitFor(() =>
            expect(joinGroupByCode).toHaveBeenCalledWith('test-code')
        )

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalled()
        )

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/group/test-group-id')
        );
    });

    it('should show validation error when invite code input is empty', async () => {
        renderShowJoinGroupFormBtn();

        const openJoinGroupFormBtn = screen.getByRole('button', { name: /join/i });

        fireEvent.click(openJoinGroupFormBtn);

        const sumbitJoinGroupBtn = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(sumbitJoinGroupBtn);

        await screen.findByText(MESSAGES.ERROR.REQUIRED)

        await waitFor(() =>
            expect(joinGroupByCode).not.toHaveBeenCalled()
        )
    });

    it('should show error when joinGroupByCode fails', async () => {
        (joinGroupByCode as jest.Mock).mockRejectedValueOnce(
            new Error('server error')
        );

        renderShowJoinGroupFormBtn();

        const openJoinGroupFormBtn = screen.getByRole('button', { name: /join/i });

        fireEvent.click(openJoinGroupFormBtn);

        const inviteCodeInput = screen.getByTestId('input-invite-code');

        fireEvent.change(inviteCodeInput, { target: { value: 'test-code' } });
        expect(inviteCodeInput).toHaveValue('test-code');

        const submitJoinGroupByCodeBtn = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(submitJoinGroupByCodeBtn);

        await waitFor(() =>
            expect(joinGroupByCode).toHaveBeenCalled()
        )

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
        });
    });
});
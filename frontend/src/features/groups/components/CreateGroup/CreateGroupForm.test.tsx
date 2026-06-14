import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateGroupForm from "./CreateGroupForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createGroup } from '../../services/createGroup';
import { MESSAGES } from "../../../../utils/messages";
import { toast } from 'react-toastify';

jest.mock('../../../auth/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { id: 'test-user-id' }
    })
}));

jest.mock('../../services/createGroup', () => ({
    createGroup: jest.fn().mockResolvedValue('test-group-id')
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Create group form component', () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    })

    const renderCreateGroupComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CreateGroupForm />
            </QueryClientProvider>
        )
    }

    it('should render create button on initial load', () => {
        renderCreateGroupComponent();
        expect(
            screen.getByRole('button', { name: /create/i })
        ).toBeInTheDocument();
    });

    it('should fill create group form data and send request', async () => {
        renderCreateGroupComponent();

        const openCreateGroupFormBtn = screen.getByRole('button', { name: /create/i });
        fireEvent.click(openCreateGroupFormBtn);

        await screen.findByRole('dialog', { name: /create group/i });

        const nameInput = screen.getByLabelText('name');
        const descriptionInput = screen.getByLabelText('description');

        fireEvent.change(nameInput, { target: { value: 'test name' } });
        expect(nameInput).toHaveValue('test name');

        fireEvent.change(descriptionInput, { target: { value: 'test description' } })
        expect(descriptionInput).toHaveValue('test description');

        const createGroupBtn = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(createGroupBtn);
        await waitFor(() =>
            expect(createGroup).toHaveBeenCalledWith({
                name: 'test name',
                description: 'test description',
                owner: 'test-user-id',
            }));

        await waitFor(() =>
            expect(screen.queryByRole('dialog'))
                .not.toBeInTheDocument()
        );

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalled()
        );
    });

    it('should show validation error when name is empty', async () => {
        renderCreateGroupComponent();

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(MESSAGES.ERROR.GROUP_NAME_TOO_SHORT))
            .toBeInTheDocument();

        expect(createGroup).not.toHaveBeenCalled();
    });

    it('should show error when createGroup fails', async () => {
        (createGroup as jest.Mock).mockRejectedValueOnce(
            new Error('Server error')
        );

        renderCreateGroupComponent();

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        fireEvent.change(screen.getByLabelText('name'), {
            target: { value: 'test name' },
        });

        fireEvent.click(
            screen.getByRole('button', { name: /submit/i })
        );

        await waitFor(() => {
            expect(createGroup).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
        });

        expect(screen.getByRole('dialog'))
            .toBeInTheDocument();
    });
});
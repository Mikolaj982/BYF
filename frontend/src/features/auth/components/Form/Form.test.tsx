import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Form from "./Form";
import { FormFields } from "../../types/auth.types";
import { MemoryRouter } from 'react-router-dom';
import { userAuthService } from "../../service/userAuthService";
import { toast } from 'react-toastify';
import { MESSAGES } from "../../../../utils/messages";

const mockNavigate = jest.fn((url: string) => url);

jest.mock('react-router-dom', () => {
    const orginalModule = jest.requireActual('react-router-dom');

    return {
        ...orginalModule,
        useNavigate: () => mockNavigate,
    }
});

jest.mock('../../service/userAuthService', () => ({
    userAuthService: {
        register: jest.fn().mockResolvedValue('test-user-data'),
        login: jest.fn().mockResolvedValue('test-user-data'),
    }
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Form Component', () => {
    const registerLabels: FormFields[] = ["username", "email", "confirmPassword", "password"];
    const loginLabels: FormFields[] = ["usernameOrEmail", "password"];
    const renderLoginRegisterForm = (labels: FormFields[], isLogin: boolean) => {
        render(<MemoryRouter>
            <Form labels={labels} isLogin={isLogin} />
        </MemoryRouter>)
    };

    it('should render for register', () => {
        renderLoginRegisterForm(registerLabels, false);

        registerLabels.forEach((label) => {
            const customId = `input-${label.toLowerCase()}`;
            const input = screen.getByTestId(customId);
            expect(input).toBeInTheDocument();
        });
    });

    it('should render for login', () => {
        renderLoginRegisterForm(loginLabels, true);

        loginLabels.forEach((label) => {
            const input = screen.getByTestId(`input-${label.toLowerCase()}`);
            fireEvent.change(input, { target: { value: "" } });
            expect(input).toBeInTheDocument();
        });
    });

    it('should fill register data and send request', async () => {
        renderLoginRegisterForm(registerLabels, false);

        const usernameInput = screen.getByTestId('input-username');

        fireEvent.change(usernameInput, { target: { value: 'test-username' } });
        expect(usernameInput).toHaveValue('test-username');

        const emailInput = screen.getByTestId('input-email');

        fireEvent.change(emailInput, { target: { value: 'testemail@gmail.com' } });
        expect(emailInput).toHaveValue('testemail@gmail.com');

        const passwordInput = screen.getByTestId('input-password');

        fireEvent.change(passwordInput, { target: { value: '#Testpassword0' } });
        expect(passwordInput).toHaveValue('#Testpassword0');

        const confirmPasswordInput = screen.getByTestId('input-confirmpassword');

        fireEvent.change(confirmPasswordInput, { target: { value: '#Testpassword0' } });
        expect(confirmPasswordInput).toHaveValue('#Testpassword0');

        const submitRegisterDataBtn = screen.getByRole('button', { name: /sign up/i });

        fireEvent.click(submitRegisterDataBtn);

        await waitFor(() =>
            expect(userAuthService.register).toHaveBeenCalledWith({
                username: 'test-username',
                email: 'testemail@gmail.com',
                password: '#Testpassword0',
                confirmPassword: '#Testpassword0',
            })
        );

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalled()
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
        );
    });

    it('should fill login data and send request', async () => {
        renderLoginRegisterForm(loginLabels, true);

        const usernameInput = screen.getByTestId('input-usernameoremail');

        fireEvent.change(usernameInput, { target: { value: 'test-username' } });
        expect(usernameInput).toHaveValue('test-username');

        const passwordInput = screen.getByTestId('input-password');

        fireEvent.change(passwordInput, { target: { value: '#Testpassword0' } });
        expect(passwordInput).toHaveValue('#Testpassword0');

        const submitLoginDataBtn = screen.getByRole('button', { name: /log in/i });

        fireEvent.click(submitLoginDataBtn);

        await waitFor(() =>
            expect(userAuthService.login).toHaveBeenCalledWith({
                usernameOrEmail: 'test-username',
                password: '#Testpassword0'
            })
        );

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalled()
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
        );
    });

    it('should show validation error when username input is empty', async () => {
        renderLoginRegisterForm(registerLabels, false);

        const submitRegisterBtn = screen.getByRole('button', { name: /sign up/i });

        fireEvent.click(submitRegisterBtn);

        const usernameInput = screen.getByTestId('input-username');
        const usernameFormControl = usernameInput.closest('.MuiFormControl-root') as HTMLElement;

        expect(
            await within(usernameFormControl).findByText(MESSAGES.ERROR.REQUIRED)
        ).toBeInTheDocument();

        expect(userAuthService.register).not.toHaveBeenCalled();
    });

    it('should show error when register fails', async () => {
        (userAuthService.register as jest.Mock).mockRejectedValueOnce(
            new Error('Server error')
        );

        renderLoginRegisterForm(registerLabels, false);

        const usernameInput = screen.getByTestId('input-username');

        fireEvent.change(usernameInput, { target: { value: 'test-username' } });
        expect(usernameInput).toHaveValue('test-username');

        const emailInput = screen.getByTestId('input-email');

        fireEvent.change(emailInput, { target: { value: 'testemail@gmail.com' } });
        expect(emailInput).toHaveValue('testemail@gmail.com');

        const passwordInput = screen.getByTestId('input-password');

        fireEvent.change(passwordInput, { target: { value: '#Testpassword0' } });
        expect(passwordInput).toHaveValue('#Testpassword0');

        const confirmPasswordInput = screen.getByTestId('input-confirmpassword');

        fireEvent.change(confirmPasswordInput, { target: { value: '#Testpassword0' } });
        expect(confirmPasswordInput).toHaveValue('#Testpassword0');

        const submitRegisterDataBtn = screen.getByRole('button', { name: /sign up/i });

        fireEvent.click(submitRegisterDataBtn);

        await waitFor(() => {
            expect(userAuthService.register).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
        });
    })
});
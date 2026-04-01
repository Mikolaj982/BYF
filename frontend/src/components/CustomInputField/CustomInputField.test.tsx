import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import CustomInputField from "./CustomInputField";

describe('CustomInputField Component', () => {
    it('should render input with label and helper text', () => {
        render(<CustomInputField label="Username" error={true} helperText="This is an error message" />);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        const label = screen.getByLabelText(/username/i);
        expect(label).toBeInTheDocument();

        const errorMessage = screen.getByText(/This is an error message/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should toggle password visibility when clicking the icon', async () => {
        const passwordLabel = 'Password'
        render(<CustomInputField label={passwordLabel} error={false} helperText="This is an error message" />);

        const input = screen.getByTestId(`input-${passwordLabel.toLowerCase()}`);
        const iconButton = screen.getByTestId('toggle-password-visibility');

        expect(input).toHaveAttribute('type', 'password');

        fireEvent.click(iconButton);
        await waitFor(() => expect(input).toHaveAttribute('type', 'text'));

        fireEvent.click(iconButton);
        await waitFor(() => expect(input).toHaveAttribute('type', 'password'));
    });

    it('should toggle confirm password visibility when clicking the icon', async () => {
        const confirmPasswordLabel = 'confirmPassword'
        render(<CustomInputField label={confirmPasswordLabel} error={false} helperText="This is an error message" />);

        const input = screen.getByTestId(`input-${confirmPasswordLabel.toLowerCase()}`);
        const iconButton = screen.getByTestId('toggle-confirm-password-visibility');

        expect(input).toHaveAttribute('type', 'password');

        fireEvent.click(iconButton);
        await waitFor(() => expect(input).toHaveAttribute('type', 'text'));

        fireEvent.click(iconButton);
        await waitFor(() => expect(input).toHaveAttribute('type', 'password'));
    });

});
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";
import { FormFields } from "../../../../pages/LoginRegister/LoginRegisterPage";
import { MemoryRouter } from 'react-router-dom';

describe('Form Component', () => {
    it('should render for register', () => {
        const registerLabels: FormFields[] = ["username", "email", "confirmPassword", "password"];
        render(<MemoryRouter>
            <Form labels={registerLabels} isLogin={false} />
        </MemoryRouter>)

        registerLabels.forEach((label) => {
            const customId = `input-${label.toLowerCase()}`;
            const input = screen.getByTestId(customId);
            expect(input).toBeInTheDocument();
        });
    });

    it('should render for login', () => {
        const loginLabels: FormFields[] = ["usernameOrEmail", "password"];
        render(<MemoryRouter>
            <Form labels={loginLabels} isLogin={true} />
        </MemoryRouter>)
        loginLabels.forEach((label) => {
            const input = screen.getByTestId(`input-${label.toLowerCase()}`);
            fireEvent.change(input, { target: { value: "" } });
            expect(input).toBeInTheDocument();
        });
    });
});
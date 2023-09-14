import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import SignupPage from "../../src/pages/register"

describe('Signup Page', () => {
    let usernameElement: HTMLElement;
    let passwordElement: HTMLElement;
    let confirmPasswordElement: HTMLElement;
    let registerButton: HTMLElement;

    const setup = (mockRegister?: any) => {
        render(<SignupPage onRegister={mockRegister} />);
        usernameElement = screen.getByLabelText("username");
        passwordElement = screen.getByLabelText("password");
        confirmPasswordElement = screen.getByLabelText("confirmPassword");
        registerButton = screen.getByRole("button", { name: "Register" });
    }

    it("should render the component", () => {
        setup();
        expect(usernameElement).toBeInTheDocument();
        expect(passwordElement).toBeInTheDocument();
        expect(confirmPasswordElement).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    it("should populate the required field error", async () => {
        setup();

        fireEvent.click(registerButton);

        await waitFor(() => {
            const messageElement = screen.queryByText(/Please fill all the fields/i);
            expect(messageElement).toBeInTheDocument();
        });
    });

    it("should display the password mismatch error", async () => {
        setup();

        fireEvent.change(usernameElement, { target: { value: "seeni" } });
        fireEvent.change(passwordElement, { target: { value: "asdf" } });
        fireEvent.change(confirmPasswordElement, { target: { value: "fdas" } });
        fireEvent.click(registerButton);

        await waitFor(() => {
            const messageElement = screen.queryByText(/Passwords does not matched!/i)
            expect(messageElement).toBeInTheDocument();
        });
    });

    it("should display the username already exists error", async () => {
        const mockRegister = jest.fn(async () => {
            const response = {
                error: 'Username is already taken',
                status: 400
            }
            return Promise.resolve(response);
        });
        setup(mockRegister);

        fireEvent.change(usernameElement, { target: { value: "seeni" } });
        fireEvent.change(passwordElement, { target: { value: "asdf" } });
        fireEvent.change(confirmPasswordElement, { target: { value: "asdf" } });
        fireEvent.click(registerButton);

        await waitFor(() => {
            const messageElement = screen.getByText(/Username is already taken/i);
            expect(messageElement).toBeInTheDocument();
        });
    });

    it("should display the success message", async () => {
        const mockRegister = jest.fn(() => {
            const response = {
                username: "seeni"
            }
            return Promise.resolve(response);
        });
        setup(mockRegister);

        fireEvent.change(usernameElement, { target: { value: "seeni" } });
        fireEvent.change(passwordElement, { target: { value: "asdf" } });
        fireEvent.change(confirmPasswordElement, { target: { value: "asdf" } });
        fireEvent.click(registerButton);

        await waitFor(() => {
            const messageElement = screen.getByText(/Register succeed/i);
            expect(messageElement).toBeInTheDocument();
        });
    });
});
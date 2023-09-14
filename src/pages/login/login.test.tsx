import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from ".";

describe("Login Page", () => {

    let usernameElement: HTMLElement;
    let passwordElement: HTMLElement;
    let loginButton: HTMLElement;

    const setup = (mockLogIn: any) => {
        render(<LoginPage logIn={mockLogIn} />);
        usernameElement = screen.getByLabelText("username");
        passwordElement = screen.getByLabelText("password");
        loginButton = screen.getByRole("button", { name: "Login" });
    }

    it("should render the component", () => {
        const mockLogIn = jest.fn();
        setup(mockLogIn);

        expect(usernameElement).toBeInTheDocument();
        expect(passwordElement).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("should show the error message for required fields", async () => {
        const errorMessage = "Username and password are required";
        const mockLogIn = jest.fn(() => {
            const response = {
                error: errorMessage,
                status: 401,
                ok: false,
                url: null
            }
            return Promise.resolve(response);
        });

        setup(mockLogIn);

        await waitFor(() => {
            fireEvent.click(loginButton);
        });

        const messageElement = screen.queryByText(errorMessage);
        expect(messageElement).toBeInTheDocument();
    });

    it("should redirect to the dashboard page", async () => {
        const mockLogIn = jest.fn(() => {
            const response = {
                error: null, status: 200, ok: true, url: 'http://localhost:3000/'
            }
            return Promise.resolve(response);
        });

        setup(mockLogIn);

        await waitFor(() => {
            fireEvent.change(usernameElement, { target: { value: "seeni" } });
            fireEvent.change(passwordElement, { target: { value: "asdf" } });
            fireEvent.click(loginButton);
        });

        const messageElement = screen.queryByText(/Login succeed/i);
        expect(messageElement).toBeInTheDocument();

    });
});
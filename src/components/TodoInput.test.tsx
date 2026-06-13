import { render, screen } from "@testing-library/react";
import TodoInput from "./TodoInput";
import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import { vi } from "vitest";

describe("TodoInput", () => {
    it("renders an input field and a button", () => {
        // Arrange + Act - render the component
        render(
            <TodoInput
                onAdd={() => {
                }}
            />,
        );

        // Assert - Check that the input field and button are rendered
        const inputElement = screen.getByPlaceholderText("Add a task...");
        const buttonElement = screen.getByRole("button", { name: /add/i });

        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("updates input value when user types", async () => {
        // Arrange
        const user = userEvent.setup();
        render(<TodoInput
            onAdd={() => {
            }}
        />);

        // Act
        const inputElement = screen.getByPlaceholderText("Add a task...");
        await user.type(inputElement, "Buy milk");

        // Assert
        expect(inputElement).toHaveValue("Buy milk");
    });

    it("calls onAdd with correct text when Add button is clicked", async () => {
        // Arrange
        const user = userEvent.setup();
        const onAdd = vi.fn();

        render(<TodoInput onAdd={onAdd} />);

        // Act
        const inputElement = screen.getByPlaceholderText("Add a task...");
        const addButton = screen.getByRole("button", { name: /add/i });
        await user.type(inputElement, "Buy milk");
        await user.click(addButton);

        // Assert
        expect(onAdd).toHaveBeenCalledWith("Buy milk");
    });

    it('clears input after Add button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const onAdd = vi.fn();

        render(<TodoInput onAdd={onAdd} />);

        // Act
        const inputElement = screen.getByPlaceholderText("Add a task...");
        const addButton = screen.getByRole("button", { name: /add/i });
        await user.type(inputElement, "Buy milk");
        await user.click(addButton);

        // Assert
        expect(inputElement).toHaveValue("");
    });

    it('does not call onAdd when input is empty', async () => {
        // Arrange
        const user = userEvent.setup();
        const onAdd = vi.fn();

        render(<TodoInput onAdd={onAdd} />);

        // Act
        const inputElement = screen.getByPlaceholderText("Add a task...");
        const addButton = screen.getByRole("button", { name: /add/i });
        await user.type(inputElement, " ");
        await user.click(addButton);
        // Assert
        expect(onAdd).not.toHaveBeenCalled();
    });
});

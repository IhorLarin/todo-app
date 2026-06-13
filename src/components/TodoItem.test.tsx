import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";

const mockTodo = {
    id: 1,
    text: "buy milk",
    done: false,
};

describe("TodoItem", () => {
    it("display the text", () => {
        // Arrange + Act - render the component
        render(
            <TodoItem
                todo={mockTodo}
                onDelete={() => {
                }}
                onToggle={() => {
                }}
            />,
        );

        // Assert — look for the text
        expect(screen.getByText("buy milk")).toBeInTheDocument();
    });

    it("renders text with line-through when done is true", () => {
        // Arrange + Act - render the component with done: true
        render(
            <TodoItem
                todo={{ ...mockTodo, done: true }}
                onDelete={() => {
                }}
                onToggle={() => {
                }}
            />,
        );

        // Assert - Check that the text has line-through style
        const textElement = screen.getByText("buy milk");
        expect(textElement).toHaveClass("line-through");
    });

    it('calls onToggle with correct id when checkbox is clicked', async () => {
        // Arrange — mock функція і рендер
        const user = userEvent.setup();
        const onToggle = vi.fn();

        render(
            <TodoItem
                todo={mockTodo}
                onDelete={() => {}}
                onToggle={onToggle}
            />,
        );

        // Act — знаходимо checkbox і клікаємо
        const checkbox = screen.getByRole('checkbox');
        await user.click(checkbox);

        expect(onToggle).toHaveBeenCalledWith(1);
    });

    it("calls onDelete with correct id when delete button is clicked", async () => {
        //Arrange -
        const user = userEvent.setup();
        const onDelete = vi.fn();

        render(
            <TodoItem
                todo={mockTodo}
                onDelete={onDelete}
                onToggle={() => {}}
            />,
        );

        // Act — знаходимо delete button і клікаємо
        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        await user.click(deleteButton);

        expect(onDelete).toHaveBeenCalledWith(1);
    });
});

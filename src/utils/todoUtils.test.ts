import { describe, it, expect } from "vitest";
import { createTodo, deleteTodo, toggleTodo, filterTodos } from "./todoUtils";

describe("createTodo", () => {
    it("creates a todo with the correct text and done: false", () => {
        const todo = createTodo("buy milk");

        expect(todo.id).toBeDefined();
        expect(typeof todo.id).toBe("number");
        expect(todo.text).toBe("buy milk");
        expect(todo.done).toBe(false);
    });
});

describe("deleteTodo", () => {
    it("should delete a todo with the given id", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: false },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Delete the todo with id 2
        const updatedTodos = deleteTodo(todos, 2);

        // Assert - Check that the todo with id 2 is deleted
        expect(updatedTodos).not.toContainEqual({ id: 2, text: "walk dog", done: false });
        expect(updatedTodos).toContainEqual({ id: 1, text: "buy milk", done: false });
        expect(updatedTodos).toContainEqual({ id: 3, text: "read book", done: false });
    });
});

describe("toggleTodo", () => {
    it("should toggle done: false to true", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: false },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Toggle the todo with id 2
        const updatedTodos = toggleTodo(todos, 2);

        // Assert - Check that the todo with id 2 has its done property toggled
        expect(updatedTodos).toContainEqual({ id: 2, text: "walk dog", done: true });
    });

    it("should toggle done: true to false", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: true },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Toggle the todo with id 2
        const updatedTodos = toggleTodo(todos, 2);

        // Assert - Check that the todo with id 2 has its done property toggled
        expect(updatedTodos).toContainEqual({ id: 2, text: "walk dog", done: false });
    });
});

describe("filterTodos", () => {
    it("should return all todos when filter is \"all\"", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: true },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Filter todos by "all"
        const filteredTodos = filterTodos(todos, "all");

        // Assert - Check that all todos are returned
        expect(filteredTodos).toEqual(todos);
    });

    it("should return filtered todos by \"active\" when filter is \"active\"", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: true },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Filter todos by "active"
        const filteredTodos = filterTodos(todos, "active");

        // Assert - Check that only active todos are returned
        expect(filteredTodos).toEqual([
            { id: 1, text: "buy milk", done: false },
            { id: 3, text: "read book", done: false },
        ]);
    });

    it("should return filtered todos by \"completed\" when filter is \"completed\"", () => {
        // Arrange - Create some todos
        const todos = [
            { id: 1, text: "buy milk", done: false },
            { id: 2, text: "walk dog", done: true },
            { id: 3, text: "read book", done: false },
        ];

        // Act - Filter todos by "completed"
        const filteredTodos = filterTodos(todos, "done");

        // Assert - Check that only completed todos are returned
        expect(filteredTodos).toEqual([
            { id: 2, text: "walk dog", done: true },
        ]);
    });
});

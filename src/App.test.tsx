import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
    it('adds a new todo', async () => {
        const user = userEvent.setup()
        render(<App />)

        const input = screen.getByPlaceholderText('Add a task...')
        const addButton = screen.getByRole('button', { name: /add/i })

        await user.type(input, 'buy milk')
        await user.click(addButton)

        expect(screen.getByText('buy milk')).toBeInTheDocument()
    })

    it('deletes a todo', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByPlaceholderText('Add a task...'), 'buy milk')
        await user.click(screen.getByRole('button', { name: /add/i }))

        await user.click(screen.getByRole('button', { name: 'Delete' }))

        expect(screen.queryByText('buy milk')).not.toBeInTheDocument()
    })

    it('toggles a todo', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByPlaceholderText('Add a task...'), 'buy milk')
        await user.click(screen.getByRole('button', { name: /add/i }))

        await user.click(screen.getByRole('checkbox'))

        expect(screen.getByText('buy milk')).toHaveClass('line-through')
    })

    it('filters todos by active', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByPlaceholderText('Add a task...'), 'buy milk')
        await user.click(screen.getByRole('button', { name: /add/i }))
        await user.type(screen.getByPlaceholderText('Add a task...'), 'go gym')
        await user.click(screen.getByRole('button', { name: /add/i }))

        const checkboxes = screen.getAllByRole('checkbox')
        await user.click(checkboxes[0])

        await user.click(screen.getByRole('button', { name: /active/i }))

        expect(screen.queryByText('buy milk')).not.toBeInTheDocument()
        expect(screen.getByText('go gym')).toBeInTheDocument()
    })
})

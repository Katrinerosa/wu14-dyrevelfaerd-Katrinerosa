import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './NewsletterForm'
import * as nextNavigation from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('NewsletterForm', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    ;(nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('renders form with name and email inputs', () => {
    render(<NewsletterForm />)

    expect(screen.getByPlaceholderText('Navn')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tilmeld/i })).toBeInTheDocument()
  })

  it('updates input values when user types', async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
  })

  it('shows error when name is too short', async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn')
    const emailInput = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByRole('button', { name: /tilmeld/i })

    await user.type(nameInput, 'A')
    await user.type(emailInput, 'john@example.com')
    await user.click(submitButton)

    await waitFor(() => {
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent('Skriv dit navn')
    })
  })

  it('shows error when email is invalid', async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn')
    const emailInput = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByRole('button', { name: /tilmeld/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    await waitFor(() => {
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent('gyldig emailadresse')
    })
  })

  it('shows error when email is already subscribed', async () => {
    const user = userEvent.setup()

    // Pre-populate localStorage with an email
    localStorage.setItem('dyrevelfaerd-newsletter-emails', JSON.stringify(['john@example.com']))

    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn')
    const emailInput = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByRole('button', { name: /tilmeld/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.click(submitButton)

    await waitFor(() => {
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent('allerede tilmeldt')
    })
  })

  it('stores email in localStorage and redirects on successful submission', async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn')
    const emailInput = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByRole('button', { name: /tilmeld/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.click(submitButton)

    await waitFor(() => {
      const storedEmails = JSON.parse(localStorage.getItem('dyrevelfaerd-newsletter-emails') || '[]')
      expect(storedEmails).toContain('john@example.com')
      expect(mockPush).toHaveBeenCalledWith('/newsletter/success?email=john%40example.com')
    })
  })

  it('trims and lowercases email before storage', async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const nameInput = screen.getByPlaceholderText('Navn')
    const emailInput = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByRole('button', { name: /tilmeld/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, '  JOHN@EXAMPLE.COM  ')
    await user.click(submitButton)

    await waitFor(() => {
      const storedEmails = JSON.parse(localStorage.getItem('dyrevelfaerd-newsletter-emails') || '[]')
      expect(storedEmails).toContain('john@example.com')
    })
  })

  it('supports compact prop', () => {
    const { container } = render(<NewsletterForm compact={true} />)
    const form = container.querySelector('form')
    expect(form?.className).toContain('sm:grid-cols-[1fr_1fr_auto]')
  })
})

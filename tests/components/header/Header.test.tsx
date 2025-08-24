import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@components/header/Header'

describe('Header', () => {
  test('render logo', () => {
    render(<Header />)
    const logo = screen.getByAltText(/logo/i)

    expect(logo).toBeInTheDocument()
  })
  test('render links HOME and MY BOOKS', () => {
    render(<Header />)
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/my books/i)).toBeInTheDocument()
  })

  test('links lead to the propriate href', () => {
    render(<Header />)
    const homeLink = screen.getByText(/home/i).closest("a")
    const myBooksLink = screen.getByText(/my books/i).closest("a")

    expect(homeLink).toHaveAttribute("href", "/HomePage")
    expect(myBooksLink).toHaveAttribute("href", "/library")
  })
  test("click on the button opens menu and closes it", () => {
    render(<Header />)
    const button = screen.getByRole("button", { name: /menu/i })
    const nav = screen.getByRole("navigation", { hidden: true }) || screen.getByRole("list", { hidden: true })

    //Menu closed
    expect(nav.className).toMatch(/hidden/)

    //Open menu
    fireEvent.click(button)
    expect(nav.className).toMatch(/flex/)

    //Close menu
    fireEvent.click(button)
    expect(nav.className).toMatch(/hidden/)
  })
})

// tests/layout.test.tsx
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// --------------------
// Mocks must go BEFORE importing RootLayout
// --------------------

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

// Mock Header, Footer, AuthProvider
vi.mock("../app/components/header/Header", () => ({
  default: () => <header data-testid="header">Header</header>,
}));
vi.mock("../app/components/footer/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));
vi.mock("../app/context/authContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

// --------------------
// Now import the component
// --------------------
import RootLayout, { metadata } from "../app/layout";

// --------------------
// Tests
// --------------------
describe("RootLayout", () => {
  test("renders Header, Footer, AuthProvider, and children", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("auth-provider")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(document.body).toHaveClass("font-sans", "bg-base-200");
  });

  test("exports correct metadata", () => {
    expect(metadata.title).toBe("My App");
    expect(metadata.description).toBe("Next.js App with Tailwind + daisyUI");
  });
});


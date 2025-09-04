"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext"; // Import your AuthProvider

export function Providers({ children } ) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  ); 
}

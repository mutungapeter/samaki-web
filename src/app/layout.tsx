'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ColorSchemeScript, createTheme, MantineProvider, Loader } from '@mantine/core';
import theme from "../theme/theme";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '@mui/material/styles';
import { ReduxProvider } from './Provider';

// export const metadata: Metadata = {
//   title: "Samaki ",
//   description: "Affordable samaki",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning={true}>
      <head>
      <ColorSchemeScript />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
      <MantineProvider>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        <Toaster position="top-center" reverseOrder={false} />
       </MantineProvider>
      </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
    </html>
  );
}

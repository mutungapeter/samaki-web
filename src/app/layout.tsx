'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ReduxProvider } from './Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
   
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
 
        <ReduxProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" 
        />
        </ReduxProvider>
        
        </body>
    </html>
  );
}

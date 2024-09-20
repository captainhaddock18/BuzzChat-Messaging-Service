import Navbar from "./(site)/components/Navbar";
import ActiveStatus from "./components/ActiveStatus";

import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

export const metadata = {
  title: "BuzzChat Chat App",
  description: "BuzzChat Chat App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>

        <AuthContext>
 
            <>
              <ActiveStatus />
              <ToasterContext />

              {children}
            </>
      
        </AuthContext>
      </body>
    </html>
  );
}

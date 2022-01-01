import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { FC } from "react";
import "tailwindcss/tailwind.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;

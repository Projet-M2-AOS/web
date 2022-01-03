import { CartContext } from "@components/organisms/Cart/context";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { FC, useState } from "react";
import "tailwindcss/tailwind.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <SessionProvider>
      <CartContext.Provider value={{ showCart, setShowCart }}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default App;

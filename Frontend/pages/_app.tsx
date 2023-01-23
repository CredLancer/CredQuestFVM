import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { useIsMounted } from "../hooks/useIsMounted";
import { Page } from "../components/Page";

import { Web3Provider } from "../providers/Web3";
import { ChakraProvider } from "../providers/Chakra";

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();

  return (
    <Web3Provider>
      <ChakraProvider>
        {isMounted && (
          <Page>
            <Component {...pageProps} />
          </Page>
        )}
      </ChakraProvider>
    </Web3Provider>
  );
}

export default MyApp;

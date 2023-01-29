import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { useIsMounted } from "../hooks/useIsMounted";
import { Page } from "../components/Page";

import { Web3Provider } from "../providers/Web3";
import { ChakraProvider } from "../providers/Chakra";
import QueryClientProvider from "../providers/Query";

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();

  return (
    <Web3Provider>
      <QueryClientProvider>
        <ChakraProvider>
          {isMounted && (
            <Page>
              <Component {...pageProps} />
            </Page>
          )}
        </ChakraProvider>
      </QueryClientProvider>
    </Web3Provider>
  );
}

export default MyApp;

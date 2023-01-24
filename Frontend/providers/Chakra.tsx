import {
  ChakraProvider as ChakraUiProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const theme = extendTheme({
  colors: {
    backgroundDark: "#1F1B24",
    purple: {
      1: "#9C1EF3",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#1F1B24",
        color: "white",
      },
    },
  },
});

export function ChakraProvider(props: Props) {
  return <ChakraUiProvider theme={theme}>{props.children}</ChakraUiProvider>;
}

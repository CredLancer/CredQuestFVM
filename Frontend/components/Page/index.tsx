import React, { FC } from "react";
import { Flex } from "@chakra-ui/layout";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { TribeMembers } from "../TribeMembers";
import { CompletedQuests } from "../CompletedQuests";
import Head from "next/head";
// import { useWallet } from '../../context/wallet-provider'

export const Page: FC<{ children?: React.ReactNode }> = ({ children }) => {
  // const { activateBrowserWallet, account } = useWallet()

  //Uncomment this if you want the wallet to connect as soon as the website loads
  // useEffect(() => {
  //   try {
  //     activateBrowserWallet()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [activateBrowserWallet])

  return (
    <>
      <Flex direction="column">
        <Header />
        <main>{children}</main>
        <Footer />
      </Flex>
    </>
  );
};

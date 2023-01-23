import { Box, Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";

const CallToAction = () => {
  return <Box padding="12">Dashboard</Box>;
};

const Home: NextPage = () => {
  return (
    <Container>
      <CallToAction />
    </Container>
  );
};

export default Home;

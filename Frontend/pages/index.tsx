import { Box, Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { SelectRoleModal } from "../components/Modals/SelectRole";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { TribeMembers } from "../components/TribeMembers";
import { CompletedQuests } from "../components/CompletedQuests";


type QuestType = "create-quest" | "join-quest" | undefined;

const CallToAction = () => {
  const { isConnected, address } = useAccount();
  const [openModal, setOpen] = useState<QuestType>();
  const handleCreateQuest = () => {
    setOpen("create-quest");
  };
  const handleJoinQuest = () => {
    setOpen("join-quest");
  };

  const disabled = !isConnected || !address;
  console.log({ disabled });

  if (openModal) {
    return <SelectRoleModal handleClose={() => setOpen(undefined)} />;
  }

  return (
    <Box padding="12" minH="md" mt="200px">
      <Heading fontFamily="Alvotica" textAlign="center" color="#9C1EF3">
        Join a Quest
      </Heading>
      <Heading fontFamily="Alvotica" textAlign="center" color="#9C1EF3">
        Find your Soul Bound Tribe
      </Heading>

      <Flex alignItems="center" justifyContent="center" gap="8" marginTop="10">
        <Button
          onClick={() => handleCreateQuest()}
          disabled={disabled}
          colorScheme="blue"
          type="button"
        >
          Create a Quest
        </Button>

        <Button
          colorScheme="blue"
          disabled={disabled}
          onClick={handleJoinQuest}
          type="button"
          variant="outline"
        >
          Join a Quest
        </Button>
      </Flex>
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <Box bgGradient='linear(#71DCCC 0%, #71DCCC 25%, #29116c 50%, )'>
    <Container>
      <CallToAction />
    </Container>
    <CompletedQuests />
    <TribeMembers />
    </Box>
  );
};

export default Home;

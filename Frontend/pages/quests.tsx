import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  SkeletonCircle,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  List,
  ListItem,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { SelectRoleModal } from "../components/Modals/SelectRole";
import { useRouter } from "next/router";
import { QuestDisplayPage } from "../components/Page/QuestDisplay";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@chakra-ui/icons";

const ViewQuests: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push("");
    return null;
  }

  return (
    <Box
      bgGradient="linear(#9C1EF3 0%, #9C1EF3 25%, #29116c 75%)"
      p="3em"
      minH="3xl"
    >
      <QuestDisplayPage header={<Heading>View Quests</Heading>}>
        <Box px="2em" py="4em">
          <Heading as="h4">Available Quests</Heading>
          <List mt="10">
            <ListItem>
              <Flex alignItems="stretch" justifyContent="flex-start" gap="8">
                <Box>
                  <SkeletonCircle size="28" />
                </Box>

                <Box flex="1">
                  <Text fontWeight="bold">John Doe</Text>
                  <Text mt="3">
                    Creating in-game graphics, audio engineering and VR
                  </Text>
                </Box>

                <VStack>
                  <Button colorScheme="pink" w="100%">
                    Update
                  </Button>
                  <Button colorScheme="whiteAlpha" w="100%">
                    View
                  </Button>
                </VStack>
              </Flex>
            </ListItem>
          </List>
        </Box>
      </QuestDisplayPage>
    </Box>
  );
};

export default ViewQuests;

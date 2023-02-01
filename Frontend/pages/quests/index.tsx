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
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { SelectRoleModal } from "../../components/Modals/SelectRole";
import { useRouter } from "next/router";
import { QuestDisplayPage } from "../../components/Page/QuestDisplay";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { DashboardLayout } from "../../components/Page/DashboardLayout";
import { CreateQuestView, ListQuestsView } from "../../components/views";

const ViewQuests: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const tab = router.query.tab as string;

  if (!isConnected) {
    router.push("/");
    return null;
  }

  const selectedTab = {
    backgroundColor: "white",
    border: "5px solid transparent",
    borderRadius: "0",
    borderColor: "transparent rgba(69, 76, 115, 0.88)",
  };

  return (
    <DashboardLayout>
      <Tabs
        variant="unstyled"
        colorScheme="cyan"
        defaultIndex={Number(tab) ?? 0}
      >
        <TabList color="#321975" border="5px solid rgba(69, 76, 115, 0.88)">
          <Tab flex="1" _selected={selectedTab}>
            View Quests
          </Tab>
          <Tab flex="1" _selected={selectedTab}>
            Create Quest
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box h="100%" p="12" color="black.2" bg="#E8EDF6">
              <ListQuestsView />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box h="100%" p="12" color="black.2" bg="#c9c9c9" borderRadius={7}>
              <CreateQuestView />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default ViewQuests;

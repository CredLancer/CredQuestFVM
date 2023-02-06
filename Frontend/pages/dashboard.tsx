import Logo from "../assets/svg/credlancer_logo.svg";
import LogoCred from "../assets/svg/credlancer-cred.svg";
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
  Stack,
  HStack,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { SelectRoleModal } from "../components/Modals/SelectRole";
import { useRouter } from "next/router";
import { BackHouseLayout } from "../components/Page/BackOfHouseLayout";
import { DashboardLayout } from "../components/Page/DashboardLayout";

interface MemberCredentials {
  id: string;
  href?: string;
  logo?: string;
  tagImage?: string;
  issueBy?: string;
  hoursCompleted?: number;
  skills?: string[];
  issueDate?: string;
}

const Dashboard: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

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

  const credentials: MemberCredentials[] = [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];

  return (
    <DashboardLayout>
      <Box>
        <Tabs variant="unstyled" colorScheme="cyan" defaultIndex={1}>
          <TabList color="#321975" border="5px solid rgba(69, 76, 115, 0.88)">
            <Tab _selected={selectedTab} flex="1" isDisabled>
              My Members
            </Tab>
            <Tab _selected={selectedTab} flex="1">
              Quests & Creds
            </Tab>
            <Tab _selected={selectedTab} flex="1" isDisabled>
              Analytics
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Nothing to see here</TabPanel>
            <TabPanel>
              <Box py="10" px="2">
                <Accordion allowMultiple allowToggle border="2px solid #E8EDF6">

                  <AccordionItem mb="50px">
                    <h2>
                      <AccordionButton
                        bg="#321975"
                        color="white"
                        _hover={{ bg: "#321975" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Member Creds
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bg="#E8EDF6" py={10} px="24" color="black">
                      Member Credentials
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem mb="50px">
                    <h2>
                      <AccordionButton
                        bg="#321975"
                        color="white"
                        _hover={{ bg: "#321975" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Completed
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bg="#E8EDF6" py={10} px="24" color="black">

                      <Box 
                        boxShadow='md' 
                        bgGradient="linear(to-b, #7ea1cb, #2c5683)" 
                        borderColor={"#9771ff"} 
                        borderWidth={"5px"}
                        w={"200px"} 
                        h={"300px"} 
                        rounded={"25px"}>

                        <VStack pt="50px" px="20px" align={"start"}>
                            <Logo width="150" height="50" />
                            <Box rounded={"50px"} minW="150px" bg="#9771ff">
                              Uhm
                            </Box>
                            <Text color="white" fontSize={"10px"} textAlign="start">Issue by: Developer DAO</Text>
                            <Text color="white" fontSize={"10px"} textAlign="start">Issue Date: 1/2023</Text>
                            <Text color="white" fontSize={"10px"} textAlign="start">Hours Completed: 100</Text>
                            <Text color="white" fontSize={"10px"} textAlign="start">Skills: Skill 1, Skill, Skill 3</Text>
                        </VStack>
                      </Box>

                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem mb="50px">
                    <h2>
                      <AccordionButton
                        bg="#321975"
                        color="white"
                        _hover={{ bg: "#321975" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Pending
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bg="#E8EDF6" py={10} px="24" color="black">
                      Quest Pending
                    </AccordionPanel>
                  </AccordionItem>


                </Accordion>
              </Box>
            </TabPanel>
            <TabPanel>Nothing to analyze yet anyway</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;

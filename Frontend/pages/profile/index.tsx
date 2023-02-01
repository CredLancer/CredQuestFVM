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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { useQuery } from "react-query";
import { SelectRoleModal } from "../../components/Modals/SelectRole";
import { useRouter } from "next/router";
import { OrganizationService } from "../../services/organization.service";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data, isLoading, isError, error } = useQuery(
    ["organization.address", address],
    () => OrganizationService.findOrganizationByAddress(`${address}`)
  );

  console.log({ data });

  return (
    <Box bgGradient="linear(#71DCCC 0%, #E8EDF6 25%, #71DCCC 75%)" minH="3xl">
      <Container maxW="6xl" paddingY="2em">
        <Box
          maxW="100%"
          marginX="auto"
          mt="12"
          border="1px solid white"
          bg="#29116C"
        >
          <Flex
            backgroundColor="white"
            alignItems="flex-end"
            justifyContent="space-between"
            padding="10px"
          >
            <Heading color="black" fontSize="large" as="h4">
              My Profile
            </Heading>

            <Button
              onClick={() => router.push("/profile/update")}
              variant="link"
            >
              Edit Profile
            </Button>
          </Flex>

          <Grid
            gridTemplateColumns="1fr auto"
            justifyContent="space-between"
            gap="2em"
            p="2em"
          >
            <GridItem>
              <Grid
                gridTemplateColumns="150px 1fr"
                alignItems="stretch"
                gap="1em"
                justifyContent="space-between"
              >
                <GridItem>
                  <Heading as="h3" textAlign="center">
                    Bit Dao
                  </Heading>
                </GridItem>
                <GridItem justifySelf="flex-end">
                  <Button colorScheme="teal">Add to Favorites</Button>
                </GridItem>
                <GridItem alignSelf="center">
                  <SkeletonCircle
                    size="20"
                    m="auto"
                    startColor="pink.500"
                    endColor="orange.500"
                  />
                </GridItem>
                <GridItem>
                  <Box>
                    <Heading>Industry</Heading>
                    <Text>
                      Creating In-game graphics, audio engineering, VR
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem alignSelf="center" justifySelf="center">
              <VStack>
                <Button
                  onClick={() => router.push("/quests?tab=1")}
                  colorScheme="blue"
                >
                  Create Quest
                </Button>
                <Button
                  onClick={() => router.push("/quests?tab=0")}
                  colorScheme="blue"
                  variant="outline"
                >
                  View Quests
                </Button>
              </VStack>
            </GridItem>
          </Grid>

          <HStack spacing="24px" bg="#71DCCC" p="4" mx="6" my="10">
            <Box w="fit-content">
              <VStack>
                <Text fontWeight="extrabold">43.5k</Text>
                <Text>Twitter Followers</Text>
              </VStack>
            </Box>
            <Box w="fit-content">
              <VStack>
                <Text fontWeight="extrabold">0</Text>
                <Text>Discord Members</Text>
              </VStack>
            </Box>
            <Box w="fit-content">
              <VStack>
                <Text fontWeight="extrabold">0k</Text>
                <Text>Holders</Text>
              </VStack>
            </Box>
            <Box w="fit-content">
              <VStack>
                <Text fontWeight="extrabold">50.5k</Text>
                <Text>Transactions</Text>
              </VStack>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;

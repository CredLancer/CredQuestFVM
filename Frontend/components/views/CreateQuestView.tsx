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

export const CreateQuestView = () => {
  const { handleSubmit, register } = useForm();
  //   const isFirstTime = false;
  const [submitStatus, setStatus] = useState<"" | "success" | "error">("");

  const onSubmit = (model: any) => {
    console.log({ model });
    setStatus("success");
  };

  return submitStatus === "success" ? (
    <Box>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="7"
      >
        <Heading as="h3">Quest Created Successfully</Heading>

        <Box>
          <CheckCircleIcon
            width="=100px"
            height="100px"
            color="white"
            stroke="green"
          />
        </Box>

        <Text>Your Quest has been successfully created!</Text>
      </Flex>
    </Box>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading textAlign="center" as="h3" mb="10">
        Fill form to create Quest
      </Heading>
      <Grid gap="6" gridTemplateColumns="1fr 1fr 1fr 1fr">
        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel htmlFor="title">Title of Quest</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="title"
              {...register("title")}
              type="text"
              color="black.5"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="hoursRequired">Hours Required</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="hoursRequired"
              {...register("hoursRequired")}
              type="number"
              color="black.5"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="deadline">Deadline</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="deadline"
              type="datetime-local"
              color="black.5"
              {...register("deadline")}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel htmlFor="credentials">
              Credential Requirement (Describe what NFTs users should have)
            </FormLabel>
            <Textarea
              bg="white.2"
              borderRadius="2px"
              id="credentials"
              color="black.5"
              {...register("credentials")}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel htmlFor="skills">Skill Requirement</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="skills"
              type="number"
              color="black.5"
              {...register("skills")}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="extraFiles">Upload from Files</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="extraFiles"
              type="file"
              color="black.5"
              name="extraFiles"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="reward">Quest Reward (in FIL)</FormLabel>
            <Input
              bg="white.2"
              borderRadius="2px"
              id="reward"
              type="number"
              color="black.5"
              {...register("reward")}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel htmlFor="credentials">
              Description of Quest (3000-10000 characters)
            </FormLabel>
            <Textarea
              bg="white.2"
              borderRadius="2px"
              height="200px"
              id="description"
              color="black.5"
              {...register("description")}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <Button width="100%" type="submit" colorScheme="purple">
            CREATE
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

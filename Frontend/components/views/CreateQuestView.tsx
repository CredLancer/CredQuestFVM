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
  Spinner,
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
import { useMutation, useQuery } from "react-query";
import { OrganizationService, QuestService } from "../../services";

export const CreateQuestView = () => {
  const { address } = useAccount();
  const { handleSubmit, register } = useForm();
  const { data: organization, isLoading } = useQuery(
    ["organization.address", address],
    () => OrganizationService.findOrganizationByAddress(`${address}`)
  );

  const {
    mutate,
    isLoading: isSubmitting,
    error,
    isSuccess,
  } = useMutation(QuestService.createQuest);

  const onSubmit = (model: any) => {
    mutate({
      title: model.title,
      description: model.description,
      reward: Number(model.reward),
      orgId: Number(organization.org.id),
    });
  };

  console.log({ error, organization, isSuccess });

  return (
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
              type="text"
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
            <FormLabel htmlFor="description">
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
            {isSubmitting ? <Spinner /> : "CREATE"}
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

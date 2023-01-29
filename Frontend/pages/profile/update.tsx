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
  Square,
  Input,
  FormLabel,
  VisuallyHiddenInput,
  FormControl,
  Select,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { OrganizationService } from "../../services/organization.service";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { mutate } = useMutation(OrganizationService.createOrganizationProfile);
  const { handleSubmit, register, setValue, getValues } = useForm();

  const onSubmit = (model: any) => {
    console.log({ model });
    mutate(model, {
      //   onSuccess: () => router.push("/profile"),
    });
  };

  console.log({ values: getValues("org_logo") });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue("org_logo", files[0]);
    }
  };

  return (
    <Box
      bgGradient="linear(#321975E0 0%, #7D18C2E0 25%, #71DCCC 75%)"
      minH="3xl"
    >
      <Container maxW="4xl" paddingY="2em">
        <Box
          maxW="100%"
          marginX="auto"
          mt="12"
          border="1px solid white"
          bg="#29116C"
        >
          <Flex
            backgroundColor="white"
            alignItems="center"
            justifyContent="center"
            padding="10px"
          >
            <Heading color="black" fontSize="large" as="h4">
              Update Profile
            </Heading>
          </Flex>

          <Box p="30px">
            <Heading as="h4" textAlign={`center`}>
              Please Complete:
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="6">
                <GridItem colSpan={4}>
                  <FormLabel>
                    <Square size="150px" border="1px dashed currentColor">
                      <Text>Choose a logo to upload</Text>
                      {getValues("org_logo") ? (
                        <Text>{getValues("org_logo").name}</Text>
                      ) : null}
                    </Square>
                    <VisuallyHiddenInput
                      name="org_logo"
                      onChange={handleFileUpload}
                      type="file"
                    />
                  </FormLabel>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <Input
                      bg="white.2"
                      borderRadius="2px"
                      {...register("first_name")}
                      id="first_name"
                      type="text"
                      color="black.5"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <Input
                      bg="white.2"
                      borderRadius="2px"
                      id="last_name"
                      {...register("last_name")}
                      type="text"
                      color="black.5"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      bg="white.2"
                      borderRadius="2px"
                      {...register("email")}
                      id="email"
                      type="text"
                      color="black.5"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      bg="white.2"
                      {...register("password")}
                      borderRadius="2px"
                      id="password"
                      type="text"
                      color="black.5"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={4}>
                  <FormControl>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select
                      placeholder="Select country..."
                      id="country"
                      bg="white.2"
                      color="black.5"
                      {...register("country")}
                      borderRadius="2px"
                    >
                      {[
                        "USA",
                        "Mexico",
                        "India",
                        "Nigeria",
                        "Sudan",
                        "Peru",
                        "Brazil",
                        "China",
                        "Japan",
                        "Russia",
                        "Germany",
                      ].map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={4}>
                  <Button width="100%" type="submit" colorScheme="purple">
                    CREATE
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;

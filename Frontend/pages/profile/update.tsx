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
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import ORGANIZATION_ABI from "../../assets/contracts/OrganizationController.json";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSendTransaction,
} from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { OrganizationService } from "../../services/organization.service";
import Image from "next/image";
import { ORGANIZATION_CONTRACT } from "../../utils/constants";

type LogoInfo = {
  size: number;
  name: string;
  image: string;
};

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const {
    mutate,
    data: profile_data,
    isLoading: isSubmitting,
  } = useMutation(OrganizationService.createOrganizationProfile);
  const { handleSubmit, register, setValue } = useForm();
  const [uploadedLogo, setUploadedLogo] = useState<LogoInfo>();

  const { config } = usePrepareContractWrite({
    address: ORGANIZATION_CONTRACT,
    abi: ORGANIZATION_ABI,
    functionName: "createOrganization",
    args: [
      profile_data.name ?? "name_not_found",
      profile_data.imageCID,
      profile_data.signature,
      profile_data.nonce,
    ],
    enabled: !!profile_data && !!address,
  });
  useContractWrite(config);

  const onSubmit = (model: any) => {
    console.log({ model });

    if (!address) {
      alert("Please connect your wallet");
      return;
    }
    const formData = new FormData();
    formData.append("image", model.org_logo);
    formData.append("name", `${model.first_name} ${model.last_name}`);
    formData.append("admin", address);
    mutate(formData);
  };

  console.log({ profile_data });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const logo = files[0];
      const size = logo?.size,
        name = logo?.name;

      if (size && name) {
        const image = URL.createObjectURL(logo);
        setUploadedLogo({
          size,
          name,
          image,
        });
        setValue("org_logo", logo);
      }
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
                  <Flex
                    gap="6"
                    alignItems={`flex-end`}
                    justifyContent="flex-start"
                  >
                    <FormLabel>
                      {uploadedLogo ? (
                        <Square
                          overflow="hidden"
                          alignItems="start"
                          maxH="100%"
                          minH="100%"
                          maxW="100%"
                          minW="100%"
                        >
                          <Image
                            src={uploadedLogo?.image ?? ""}
                            alt={uploadedLogo?.name}
                            width="100%"
                            height="100%"
                          />
                        </Square>
                      ) : (
                        <Square
                          size="150px"
                          p="3"
                          textAlign={`center`}
                          border="1px dashed currentColor"
                        >
                          <Text>Choose a logo to upload</Text>
                        </Square>
                      )}
                      <VisuallyHiddenInput
                        name="org_logo"
                        onChange={handleFileUpload}
                        type="file"
                      />
                    </FormLabel>

                    {uploadedLogo ? (
                      <Box>
                        <VStack spacing="4" alignItems="flex-start">
                          <Text color="black.5">
                            <span
                              style={{ fontWeight: "bolder", color: "white" }}
                            >
                              File Size:
                            </span>{" "}
                            {Math.round(uploadedLogo.size / 100)}Kb
                          </Text>
                          <Text color="black.5">
                            <span
                              style={{ fontWeight: "bolder", color: "white" }}
                            >
                              File Name:
                            </span>{" "}
                            {uploadedLogo.name}
                          </Text>
                        </VStack>
                      </Box>
                    ) : null}
                  </Flex>
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
                    {isSubmitting ? <Spinner /> : "CREATE"}
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

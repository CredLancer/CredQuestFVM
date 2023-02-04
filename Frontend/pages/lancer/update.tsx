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
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSendTransaction,
  useSigner,
  useWebSocketProvider,
} from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { LancerService } from "../../services/lancer.service";
import Image from "next/image";
//import { ORGANIZATION_CONTRACT } from "../../utils/constants";
import { InternalNavigationPage } from "../../components/Page/InternalPage";

import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import { useQuery } from "react-query";

import { BASE_URL } from "../../utils/constants";

type LogoInfo = {
  size: number;
  name: string;
  image: string;
};

const LancerProfile: NextPage = () => {

  const { address } = useAccount();
  //const { data: signer } = useSigner();
  const provider = useWebSocketProvider();
  // const contract = useContract({
  //   address: ORGANIZATION_CONTRACT,
  //   abi: ORGANIZATION_ABI,
  //   signerOrProvider: signer,
  // });


  //console.log(data);

  const {
    mutate,
    data: profile_data,
    isLoading: isSubmitting,
  } = useMutation(LancerService.createLancerProfile);

  const { handleSubmit, register, setValue } = useForm();
  const [uploadedLogo, setUploadedLogo] = useState<LogoInfo>();

  //const [signMsg, setSignMsg] = useState<signer>();

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables, resultData) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      //setSignMsg(data);
      console.log(typeof(data));
      var value = data;
      //postLancer(value);
    },
  })

  const postLancer = async (value: any, model: any ) => {

    console.log(value);
    console.log(model);

    const formData = new FormData();
    formData.append("image", model.lancer_logo);
    formData.append("name", `${model.lancer_name}`);
    formData.append("description", model.lancer_description);
    formData.append("email", model.email);
    //formData.append("address", address);
    formData.append("signature", "");
    mutate(formData, {
      onSuccess: async (response) => {
        console.log({ response });
        const { name, imageCID, signature, nonce } = response;
        // contract?.createOrganization(name, imageCID, signature, nonce, {
        //   maxPriorityFeePerGas: await (provider as any)?.send(
        //     "eth_maxPriorityFeePerGas",
        //     []
        //   ),
        // });
      },
    });    

  };

  const onSubmit = async (model: any) => {
    console.log({ model });


    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    const res = await fetch(`${BASE_URL}/lancer/${address}`);
		const data = await res.json();
		console.log(data);
    const message = data.message;

    await signMessage({ message });


  };

  //console.log({ provider, signer });

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
        setValue("lancer_logo", logo);
      }
    }
  };

  return (
    <InternalNavigationPage
      heading={
        <Heading color="black" fontSize="large" as="h4">
          Update Profile
        </Heading>
      }
    >
      <Heading as="h4" textAlign={`center`}>
        Please Complete:
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="6">
          <GridItem colSpan={4}>
            <Flex gap="6" alignItems={`flex-end`} justifyContent="flex-start">
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
                    <Text>Choose a Image to upload</Text>
                  </Square>
                )}
                <VisuallyHiddenInput
                  name="lancer_logo"
                  onChange={handleFileUpload}
                  type="file"
                />
              </FormLabel>

              {uploadedLogo ? (
                <Box>
                  <VStack spacing="4" alignItems="flex-start">
                    <Text color="black.5">
                      <span style={{ fontWeight: "bolder", color: "white" }}>
                        File Size:
                      </span>{" "}
                      {Math.round(uploadedLogo.size / 100)}Kb
                    </Text>
                    <Text color="black.5">
                      <span style={{ fontWeight: "bolder", color: "white" }}>
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
              <FormLabel htmlFor="lancer_name">Name</FormLabel>
              <Input
                bg="white.2"
                borderRadius="2px"
                {...register("lancer_name")}
                id="lancer_name"
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

          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel htmlFor="lancer_description">Description</FormLabel>
              <Input
                bg="white.2"
                borderRadius="2px"
                id="lancer_description"
                {...register("lancer_description")}
                type="text"
                color="black.5"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
          </GridItem>

          <GridItem colSpan={4}>
            <Button width="100%" type="submit" colorScheme="purple">
              {isSubmitting ? <Spinner /> : "CREATE"}
            </Button>
          </GridItem>
        </Grid>
      </form>
    </InternalNavigationPage>
  );
};

export default LancerProfile;

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SkeletonCircle,
    Spinner,
    Text,
    Textarea,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  import { useForm } from "react-hook-form";
  import QUEST_ABI from "../../assets/contracts/QuestController.json";
  import { toast } from "react-toastify";
  import {
    useAccount,
    useContract,
    useMutation,
    useSigner,
    useSignMessage,
    useWebSocketProvider,
  } from "wagmi";
  import { LancerService, ProposalService, QuestsService } from "../../services";
  import { ORGANIZATION_CONTRACT, QUEST_CONTRACT } from "../../utils/constants";
  import { useQuery } from "react-query";
  import { QuestProposalType } from "../../utils/models";
  
  type SingleProposalProps = QuestProposalType;
  
  // const ViewLancerSingleProposal: React.FC<SingleProposalProps> = ({ ...quest }) => {
  //   const { data: proposalData } = useQuery(["proposal.id", proposal.id], () =>
  //     ProposalService.fetchQuestByCID(proposal.id)
  //   );
  //   console.log("*******  proposal *************");
  //   console.log({ quest });
  //   return (
  //     <Grid gridTemplateColumns="7em 1fr 10em">
  //       <GridItem>
  //         <SkeletonCircle size="20" />
  //       </GridItem>
  
  //       <GridItem>
  //         <Flex direction="column" gap="3">
  //           <Text fontWeight="600">John Doe</Text>
  //           <Text color="#E8EDF6">Description goes here!</Text>
  //         </Flex>
  //       </GridItem>
  
  //       <GridItem>
  //         <VStack gap="3">
  //           <Button w="full" colorScheme="pink">
  //             Accept
  //           </Button>
  //           <Button w="full" colorScheme="whiteAlpha">
  //             Reject
  //           </Button>
  //         </VStack>
  //       </GridItem>
  //     </Grid>
  //   );
  // };
  
  interface Props {
    questId: number;
  }
  export const ViewLancerQuestInfoModal: React.FC<Props> = ({ questId }) => {
    const { address } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: lancerSignatureOrProfile } = useQuery(
      ["lancer.signature|profile", address],
      () => LancerService.fetchLancerSignatureOrProfile(address ?? ""),
      {
        enabled: !!address,
      }
    );

    // const { data: quest, isLoading } = useQuery(
    //   ["proposal.quest", questId],
    //   () => QuestsService.fetchQuestById(questId.toString()),
    //   {
    //     enabled: !!questId,
    //   }
    // );


    // const ListLancerQuestsView = () => {
    //   const { data, isLoading } = useQuery(
    //     "quest",
    //     () => QuestsService.fetchQuestById(questId.toString())
    //   );
    // };


    console.log("*** questId ***");
    console.log(questId);
    console.log("*** quest ***");
    //console.log(data);


    console.log("*** proposal ***");
    console.log({ questId });
  
    return (
      <>
        <Button onClick={() => onOpen()} colorScheme="teal" w="100%">
          View
        </Button>

        <Modal
          isCentered
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent
            minW="700px"
            background="black"
            padding="2em"
            borderRadius="10px"
          >
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Heading textAlign="center" fontFamily="Aclonica">
                  Quest Details
                </Heading>
  
                <Box mt="8">

                <Grid gap="6" gridTemplateColumns="1fr 1fr 1fr 1fr">
                    <GridItem colSpan={4}>
                      <FormControl>
                        <FormLabel htmlFor="title">Title of Quest</FormLabel>
                        <Input
                          bg="white.2"
                          borderRadius="2px"
                          id="title"
                          // {...register("title")}
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
                          // {...register("hoursRequired")}
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
                          // {...register("deadline")}
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
                          // {...register("credentials")}
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
                          step="0.01"
                          type="number"
                          color="black.5"
                          // {...register("reward")}
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
                          // {...register("description")}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
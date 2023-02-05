import {
  Badge,
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
import { LancerService, ProposalService } from "../../services";
import { ORGANIZATION_CONTRACT, QUEST_CONTRACT } from "../../utils/constants";
import { useQuery } from "react-query";
import { ProposalStatus, QuestProposalType } from "../../utils/models";

type SingleProposalProps = QuestProposalType;

const ViewSingleProposal: React.FC<SingleProposalProps> = ({ ...proposal }) => {
  return (
    <Grid gridTemplateColumns="7em 1fr 10em">
      <GridItem>
        <SkeletonCircle size="20" />
        <Badge mt="4" colorScheme="blue" p="2">
          {proposal.status}
        </Badge>
      </GridItem>

      <GridItem>
        <Flex direction="column" gap="3">
          <Text fontWeight="600">{proposal.proposer.name}</Text>
          <Text color="#E8EDF6" noOfLines={5}>
            {proposal.file.description}
          </Text>
        </Flex>
      </GridItem>

      <GridItem>
        {proposal.status === ProposalStatus.Proposed ? (
          <VStack gap="3">
            <Button w="full" colorScheme="pink">
              Accept
            </Button>
            <Button w="full" colorScheme="whiteAlpha">
              Reject
            </Button>
          </VStack>
        ) : null}
      </GridItem>
    </Grid>
  );
};

interface Props {
  questId: number;
}
export const ViewQuestInfoModal: React.FC<Props> = ({ questId }) => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: lancerSignatureOrProfile } = useQuery(
    ["lancer.signature|profile", address],
    () => LancerService.fetchLancerSignatureOrProfile(address ?? ""),
    {
      enabled: !!address,
    }
  );
  const { data: proposal, isLoading } = useQuery(
    ["proposal.quest", questId],
    () => ProposalService.fetchProposalsbyQuestId(questId),
    {
      enabled: !!questId,
    }
  );

  console.log({ proposal });

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
                View Proposals
              </Heading>

              <Box mt="8">
                {proposal?.proposals.length ? (
                  proposal.proposals.map((proposal) => (
                    <ViewSingleProposal {...proposal} />
                  ))
                ) : (
                  <Box textAlign="center" color="red">
                    No Available Proposals
                  </Box>
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

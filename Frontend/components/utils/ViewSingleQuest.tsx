import {
  Box,
  Button,
  Flex,
  SkeletonCircle,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QuestResponse } from "../../utils/models";
import { QuestService, OrganizationService } from "../../services";
import { useAccount } from "wagmi";
import { useQuestContext } from "../../providers/Quest";
import { useRouter } from "next/router";

interface ComponentProps extends QuestResponse {
  handleUpdate: (quest?: QuestResponse) => void;
}

export const ViewSingleQuest: React.FC<QuestResponse> = ({ ...quest }) => {
  const { updateSelectedQuest, updateEditQuestStatus } = useQuestContext()!;
  const router = useRouter();
  const { address } = useAccount();
  const { questCID, id, orgId } = quest;
  const { data, isLoading } = useQuery([`Quest-${id}`, questCID], () =>
    QuestService.fetchQuestByCID(questCID)
  );
  const { data: organization } = useQuery(
    ["organization.address", address],
    () => OrganizationService.findOrganizationByAddress(`${address}`)
  );
  const initiateQuestUpdate = () => {
    updateSelectedQuest(quest);
    updateEditQuestStatus(true);
    router.push("/quests?tab=1");
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Flex alignItems="stretch" justifyContent="flex-start" gap="4">
      <Box>
        <SkeletonCircle size="20" isLoaded={!!organization}>
          <Text>{organization?.org.name}</Text>
        </SkeletonCircle>
      </Box>

      <Box
        as={Flex}
        flex="1"
        display="flex"
        direction="column"
        alignItems="flex-start"
        justifyContent="space-evenly"
      >
        <Text fontWeight="bold">{data.title}</Text>
        <Text noOfLines={2} mt="3">
          {data.description}
        </Text>
      </Box>

      <VStack>

        <Button
          onClick={() => initiateQuestUpdate()}
          colorScheme="pink"
          w="100%"
        >
          Update
        </Button>
        
        <Button onClick={() => console.log({ id })} colorScheme="teal" w="100%">
          View
        </Button>
      </VStack>
    </Flex>
  );
};

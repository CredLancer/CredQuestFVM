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
import { QuestService } from "../../services";

interface ComponentProps {
  title: string;
  description: string;
  id: number;
  questCID: string;
  status: string;
  orgId: number;
  value: number;
  blockNumber?: number;
  deadline?: number;
}

export const ViewSingleQuest: React.FC<ComponentProps> = ({ questCID, id }) => {
  const { data, isLoading } = useQuery([`Quest-${id}`, questCID], () =>
    QuestService.fetchQuestByCID(questCID)
  );

  console.log({ data });

  return isLoading ? (
    <Spinner />
  ) : (
    <Flex alignItems="stretch" justifyContent="flex-start" gap="4">
      <Box>
        <SkeletonCircle size="20" />
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
          onClick={() => console.log({ questCID })}
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

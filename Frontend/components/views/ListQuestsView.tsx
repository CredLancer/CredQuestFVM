import {
  Box,
  Button,
  Flex,
  Text,
  SkeletonCircle,
  VStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QuestService } from "../../services";

export const ListQuestsView = () => {
  const { data, isLoading } = useQuery(
    "quests",
    () => QuestService.fetchQuests(),
    { retry: 2 }
  );

  console.log({ data });
  return isLoading ? (
    <Flex alignItems="center" justifyContent="center">
      <Spinner size="md" />
    </Flex>
  ) : (
    <List mt="10">
      {data?.quests?.length ? (
        <ListItem>
          <Flex alignItems="stretch" justifyContent="flex-start" gap="8">
            <Box>
              <SkeletonCircle size="28" />
            </Box>

            <Box flex="1">
              <Text fontWeight="bold">John Doe</Text>
              <Text mt="3">
                Creating in-game graphics, audio engineering and VR
              </Text>
            </Box>

            <VStack>
              <Button colorScheme="pink" w="100%">
                Update
              </Button>
              <Button colorScheme="whiteAlpha" w="100%">
                View
              </Button>
            </VStack>
          </Flex>
        </ListItem>
      ) : (
        <Text size="20" fontWeight="bold" textAlign="center" color="red">
          There are no Quests to display!
        </Text>
      )}
    </List>
  );
};

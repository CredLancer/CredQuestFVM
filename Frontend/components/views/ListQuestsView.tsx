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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QuestService } from "../../services";
import { ViewSingleQuest } from "../utils";

export const ListQuestsView = (lancer: number) => {
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
    <Grid mt="10" gap="6" gridTemplateColumns="1fr 1fr">
      {data?.quests?.length ? (
        data.quests.map((quest: any) => (
          
          <GridItem colSpan={1} key={quest.id}>
            <ViewSingleQuest {...quest} />
          </GridItem>
        ))
      ) : (
        <Text size="20" fontWeight="bold" textAlign="center" color="red">
          There are no Quests to display!
        </Text>
      )}
    </Grid>
  );
};

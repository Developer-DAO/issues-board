import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
} from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getIssues, Issue } from '../utils';

interface Props {
  issues: Issue[];
}

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <Accordion
      as='a'
      border='1px solid #ccc'
      padding='4'
      borderRadius='md'
      _hover={{
        cursor: 'pointer',
        bg: 'gray.50',
      }}
      href={issue.html_url}
      target='_blank'
      width='full'
      transition='all'
      transitionDuration='150ms'
    >
      <Text>{issue.project_name}</Text>
      <Heading size='md'>{issue.title}</Heading>
      <Text>
        Last activity on {new Date(issue.updated_at).toLocaleDateString()}
      </Text>
    </Accordion>
  );
};

const Home: NextPage<Props> = ({ issues }) => {
  console.log({ issues });

  return (
    <>
      <Head>
        <title>Good First Issues - D_D</title>
      </Head>
      <Container textAlign='center' py='20'>
        <Heading>D_D Good First Issues</Heading>
        <Text>
          These are some issues from Developer DAO projects on Github that are
          ideal for new contributors.
        </Text>
        <VStack mt='4'>
          {issues.map((issue) => (
            <IssueCard key={issue.url} issue={issue} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const issues = await getIssues();
  return {
    props: {
      issues,
    },
  };
}

export default Home;

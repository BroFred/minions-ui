import {ThSort, ThSortProps} from '../components/Table';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"
export default {
  title: 'Example/Table',
  component: ThSort,
} as Meta;

const Template: Story<ThSortProps> = (args) =>{
   return <Table variant="simple">
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
      <Th p="space-0"><ThSort {...args} >To convert</ThSort></Th>
      <Th><ThSort {...args} >into</ThSort></Th>
      <Th isNumeric><ThSort {...args} >multiply by</ThSort></Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>inches</Td>
      <Td>millimetres (mm)</Td>
      <Td isNumeric>25.4</Td>
    </Tr>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
    </Tr>
    <Tr>
      <Td>yards</Td>
      <Td>metres (m)</Td>
      <Td isNumeric>0.91444</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot>
</Table>
} ;

export const Sort = Template.bind({});
Sort.args = {
    children: 1213
};
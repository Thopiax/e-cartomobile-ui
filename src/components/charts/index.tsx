"use client"

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react"

import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react"

import { IoCarOutline } from "react-icons/io5"
import { RiBattery2ChargeLine } from "react-icons/ri"
import ParcAutomobile from "./ParcAutomobileChart"
import BorneRechargeChart from "./BorneRechargeChart"

export const ChartsSection = () => {
  return (
    <AccordionList className="w-full">
      <Accordion>
        <AccordionHeader>Parc Automobile</AccordionHeader>
        <AccordionBody>
          <ParcAutomobile />
        </AccordionBody>
      </Accordion>
      <Accordion>
        <AccordionHeader>Bornes de recharge</AccordionHeader>
        <AccordionBody>
          <BorneRechargeChart />
        </AccordionBody>
      </Accordion>
    </AccordionList>
  )

  return (
    <TabGroup className="flex w-full flex-col items-center gap-y-8">
      <TabList className="mt-8 w-full overflow-x-scroll" variant="solid">
        <Tab icon={IoCarOutline}>Parc Automobile</Tab>
        <Tab icon={RiBattery2ChargeLine}>Bornes de recharge</Tab>
        <Tab icon={RiBattery2ChargeLine}>Bornes de recharge</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ParcAutomobile />
        </TabPanel>
        <TabPanel>
          <BorneRechargeChart />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

"use client"

import Image from "next/image"
import { ChartsSection } from "../charts"
import { isNil } from "lodash"
import { CommuneProps } from "@/lib/types"
import { Card, Divider, Subtitle, Title } from "@tremor/react"

export interface SidebarProps {
  selectCommune?: (commune: CommuneProps | undefined) => void
  selectedCommune?: CommuneProps
}

export const ChiffresGlobauxView = () => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Title>Chiffres globaux</Title>
      <ChartsSection />
    </div>
  )
}

export const CommuneSidebarView = ({ commune }: { commune: CommuneProps }) => {
  return (
    <Card>
      <Title>{commune.com_name}</Title>
      <Subtitle>
        {commune.dep_name}, {commune.reg_name}
      </Subtitle>
    </Card>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedCommune }) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6 rounded-none bg-white px-4 py-6 shadow-xl">
      <Image
        src="/image/logo.png"
        width={200}
        height={200}
        alt={"logo"}
        priority
        placeholder="empty"
        loading="eager"
      />
      {!isNil(selectedCommune) && (
        <CommuneSidebarView commune={selectedCommune} />
      )}
      <Divider />
      <ChiffresGlobauxView />
    </div>
  )
}

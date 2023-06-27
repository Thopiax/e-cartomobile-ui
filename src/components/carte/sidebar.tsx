"use client"

import Image from "next/image"
import { ChartsSection } from "../charts"
import { isNil } from "lodash"
import { CommuneGeoProps, ScoreType } from "@/lib/types"
import { Card, Divider, Text, Metric, Subtitle, Title } from "@tremor/react"
import { getScoreClassname } from "@/lib/colors"
import ReactLoading from "react-loading"

export interface SidebarProps {
  scoresAvailable: ScoreType[]
  selectCommune?: (commune: CommuneGeoProps | undefined) => void
  selectedCommune?: CommuneGeoProps
}

export const ChiffresGlobauxView = () => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Title>Chiffres globaux</Title>
      <ChartsSection />
    </div>
  )
}

export const LinksView = () => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex flex-col gap-y-2 text-sm font-semibold text-gray-500 text-opacity-80">
        <a
          href="https://www.notion.so/dataforgood/Description-de-la-m-thode-de-calcul-des-besoins-4bc7690c593a4f899dda99485df511b9"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Méthodologie
        </a>

        <a
          href="https://github.com/Thopiax/batch11_e_cartomobile_ui"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Code source (UI)
        </a>

        <a
          href="https://github.com/dataforgoodfr/batch11_e_cartomobile"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Code source (Data)
        </a>

        <a
          href="https://www.dataforgood.fr/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Data For Good
        </a>
      </div>
    </div>
  )
}

export const CommuneScore = ({
  score,
  isAvailable,
  label,
  text,
}: {
  score?: number
  isAvailable: boolean
  label: string
  text?: string
}) => {
  // 2 decimal places

  const formattedScore = isNil(score)
    ? "-"
    : `${new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      }).format(score * 100)}%`

  return (
    <div className="flex flex-col items-start justify-start gap-y-2 py-1">
      <Subtitle>{label}</Subtitle>

      {isAvailable ? (
        <Metric className={getScoreClassname(score)}>{formattedScore}</Metric>
      ) : (
        <ReactLoading
          type="spinningBubbles"
          color={"gray"}
          height={32}
          width={32}
        />
      )}

      <Text className="text-sm text-opacity-80">{text}</Text>
    </div>
  )
}

export const CommuneSidebarView = ({
  commune,
  scoresAvailable,
}: {
  commune: CommuneGeoProps
  scoresAvailable: ScoreType[]
}) => {
  const besoinLocal = commune.scores?.local
  const besoinReseau = commune.scores?.reseau

  return (
    <Card>
      <Title>{commune.com_name}</Title>
      <Subtitle>
        {commune.dep_name}, {commune.reg_name}
      </Subtitle>

      <Divider />
      <CommuneScore
        score={besoinLocal}
        isAvailable={scoresAvailable.includes("local")}
        label="Besoin Local"
        text={"A destination des habitants de la commune"}
      />

      <Divider />
      <CommuneScore
        score={besoinReseau}
        isAvailable={scoresAvailable.includes("local")}
        label="Besoin Reseau"
        text={"A destination des gens qui passent par la commune"}
      />
    </Card>
  )
}

export const SelectCommunePlaceholder = () => {
  return (
    <Card>
      <Title>Sélectionnez une commune</Title>
      <Text className="text-sm text-opacity-80">
        Cliquez sur une commune pour afficher ses informations
      </Text>
    </Card>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({
  scoresAvailable,
  selectedCommune,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2">
      <Image
        src="/image/logo.png"
        width={200}
        height={200}
        alt={"logo"}
        priority
        placeholder="empty"
        loading="eager"
        className="mb-4"
      />
      {!isNil(selectedCommune) ? (
        <CommuneSidebarView
          scoresAvailable={scoresAvailable}
          commune={selectedCommune}
        />
      ) : (
        <SelectCommunePlaceholder />
      )}

      <Divider />
      <ChiffresGlobauxView />
      <Divider />
      <LinksView />
    </div>
  )
}

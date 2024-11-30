"use client";

import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";
import { useRouter } from 'nextjs-toploader/app';

function fontSizeMapper(word: { value: number }) {
  return Math.log2(word.value) * 5 + 16;
}

type Props = {
  formattedTopics: { text: string, value: number } [] 
}

export default function CustomWordCloud({ formattedTopics }: Props) {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <>
      <D3WordCloud
        data={formattedTopics}
        height={550}
        font={"lexend"}
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme === "dark" ? "white" : "black"}
        onWordClick={(e,d) => {
           router.push('/quiz?topic=' + d.text)
        }}
      />
    </>
  )
}

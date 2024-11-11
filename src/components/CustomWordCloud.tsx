'use client'

import { useTheme } from 'next-themes';
import D3WordCloud from 'react-d3-cloud';

const data = [
    {
        text: 'Hey',
        value: 3
    },
    {
        text: 'Nextjs',
        value: 7
    }
]

function fontSizeMapper(word: { value: number}) {
   return Math.log2(word.value) * 5 + 16
}

export default function CustomWordCloud() {

  const { theme } = useTheme()

    return <>
      <D3WordCloud data={data} height={550} font={'lexend'} fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme === 'dark' ? 'white' : 'black'}/>
     </>
}
import keyword_extractor from "keyword-extractor";
import { Fragment, useMemo } from "react";

const blank = '_____'

type Props = {
    answer: string,
    setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export default function BlankAnswerInput({answer, setBlankAnswer}: Props) {

    const keywords = useMemo(() => {
       const words = keyword_extractor.extract(answer, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
       })

     const shuffled = words.sort(() => 0.5 - Math.random())
     return shuffled.slice(0,2)

    }, [answer])

    const answerWithBlanks = useMemo(() => {
       const answerWithBlanks = keywords.reduce((acc,keyword) => {
              return acc.replaceAll(keyword, blank)
       }, answer)
       setBlankAnswer(answerWithBlanks)
       return answerWithBlanks
    }, [answer, keywords, setBlankAnswer])

    return <div className="mt-4">
            <h3 className="text-sm sm:text-lg">
                {answerWithBlanks.split(blank).map((part,i) => {
                    return (
                        <Fragment key={i}>
                             {part}
                            {i === answerWithBlanks.split(blank).length - 1 ? ( " " ) : (
                                <input id="user-blank-input" type="text" className="focus:outline-none text-center border-2 w-28 border-b-4 border-black dark:border-white focus:border-blue-700 dark:focus:border-blue-700 duration-200" />
                            )}
                        </Fragment>
                    )
                })}
            </h3>
        </div>
}
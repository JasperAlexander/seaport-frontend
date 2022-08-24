// To do: 
// 1. Add posibility to add searchbar inside accordion item
// 2. Add posibility to add radio input inside accordion item
// 3. Add check if checkedState is same as router.query

import { CheckIcon } from '../../Icons/CheckIcon'
import * as Accordion from '@radix-ui/react-accordion'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { Box } from '../../Box/Box'
import { toggleOnItem } from '../../../utils/changeRouter'
import { useRouter } from 'next/router'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './FilterAccordion.css'
import { Text } from '../../Text/Text'

interface Props {
    items: {
        header: {
            name: string
            key: string
        },
        content: {
            name: string
            key: string
        }[]
    }[]
    display?: boolean
}

export const FilterAccordion: React.FC<Props> = ({
    items,
    display = true
}) => {
    const router = useRouter()

    const [checkedState, setCheckedState] = useState<boolean[][]>(
        new Array(6).fill(new Array(6).fill(false)) // Should be max amount of AccordionItemContent
    )

    const handleOnChange = (itemIndex: number, itemContentIndex: number) => {
        const updatedCheckedState = checkedState.map((item, index) => (
            item.map((_, i) =>
                i === itemContentIndex && index === itemIndex ? !item[i] : item[i]
            )
        ))
    
        setCheckedState(updatedCheckedState)
    }

    if (items.length === 0) return null

    return (
        <Accordion.Root type="multiple" defaultValue={[items[0].header.key]}>
            {items.map((item, itemIndex) => (
                <Accordion.Item 
                    value={item.header.key}
                    key={item.header.key}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.trigger}>
                            <Text
                                as='span'
                                fontWeight='600'
                            >
                                {item.header.name}
                            </Text>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    {item.content.map((itemContent, itemContentIndex) => (
                        <Accordion.Content
                            key={itemContent.key}
                            className={styles.content}
                            onClick={() => {
                                handleOnChange(itemIndex, itemContentIndex),
                                toggleOnItem(router, itemContent.key, (!checkedState[itemIndex][itemContentIndex]).toString())
                            }}
                        >
                            <Box className={styles.item}>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                >
                                    <Box as='span'>{itemContent.name}</Box>
                                </Box>
                                <Checkbox.Root
                                    checked={checkedState[itemIndex][itemContentIndex]} 
                                    onCheckedChange={() => {
                                        handleOnChange(itemIndex, itemContentIndex)
                                        toggleOnItem(router, itemContent.key, (!checkedState[itemIndex][itemContentIndex]).toString())
                                    }}
                                    className={styles.checkbox}
                                >
                                    <Checkbox.Indicator>
                                        {checkedState[itemIndex][itemContentIndex] ? <CheckIcon width='18' /> : ''}
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                            </Box>
                        </Accordion.Content>
                    ))}
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}
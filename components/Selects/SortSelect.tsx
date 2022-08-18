//  It is not yet possible to position all options below the SelectTrigger 
//  using radix-ui, therefore decided not to use this component yet.

import { FC } from 'react'
import * as Select from '@radix-ui/react-select'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { toggleOnItem } from '../../utils/router'
import { ChevronIcon } from '../Icons/ChevronIcon'

interface Props {
    options: {
        key: string
        name: string
    }[]
    mutateData?: any
}

export const SortSelect: FC<Props> = ({
    options,
    mutateData
}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [sortSelection, setSortSelection] = useState<string>('')

    return (
        <Select.Root 
            onValueChange={() => {
                setSortSelection
                mutateData()
                toggleOnItem(router, 'sort', sortSelection)
            }} 
            onOpenChange={setOpen}
        >
            <Select.SelectTrigger
                className={sprinkles({
                    display: 'inline-flex',
                    alignItems: 'center',
                    outline: 'none',
                    justifyContent: 'space-between',
                    paddingX: '15',
                    paddingY: '10',
                    minWidth: '180',
                    gap: '10',
                    fontSize: '16',
                    borderWidth: '2',
                    borderStyle: 'solid',
                    borderColor: 'box',
                    // borderTopLeftRadius: '10',
                    // borderTopRightRadius: '10',
                    // borderBottomLeftRadius: open ? '0' : '10',
                    // borderBottomRightRadius: open ? '0' : '10',
                    borderRadius: '10',
                    background: 'defaultBackground',
                    color: 'defaultTextPlaceholder'
                })}
            >
                <Select.Value placeholder='Sort by' />
                <Select.Icon
                    className={sprinkles({
                        display: 'flex',
                        alignItems: 'center'
                    })}
                >
                    <ChevronIcon />
                </Select.Icon>
            </Select.SelectTrigger>
            {/* <Select.Portal> */}
                <Select.Content
                    className={sprinkles({
                        overflow: 'hidden',
                        background: 'defaultBackground',
                        borderWidth: '2',
                        borderStyle: 'solid',
                        borderColor: 'box',
                        paddingX: '15',
                        width: 'full',
                        // borderBottomLeftRadius: '10',
                        // borderBottomRightRadius: '10'
                        borderRadius: '10'
                    })}
                >
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        {options.map((option) => (
                            <Select.Item 
                                key={option.key}
                                value={option.key}
                                className={sprinkles({
                                    outline: 'none',
                                    paddingY: '6'
                                })}
                            >
                                <Select.ItemText>
                                    {option.name}
                                </Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.SelectScrollDownButton />
                </Select.Content>
            {/* </Select.Portal> */}
        </Select.Root>
    )
}
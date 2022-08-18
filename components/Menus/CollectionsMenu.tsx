import { useState } from 'react'
import { FC } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { sprinkles } from '../../styles/sprinkles.css'
import { ChevronIcon } from '../Icons/ChevronIcon'

type Props = {
    options: {
        key: string
        name: string
    }[]
    defaultOptionName: string
    mutateData?: any
}

const CollectionsMenu: FC<Props> = ({ 
    options,
    defaultOptionName,
    mutateData 
}) => {
    const [open, setOpen] = useState(false)
    const [collectionsSelection, setCollectionsSelection] = useState<string>(defaultOptionName)

    return (
        <DropdownMenu.Root onOpenChange={setOpen}>
            <DropdownMenu.Trigger 
                className={sprinkles({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    outline: 'none',
                    height: '48',
                    width: '220',
                    overflow: 'hidden',
                    paddingX: '20',
                    paddingY: '12',
                    fontWeight: '600',
                    fontSize: '16',
                    color: 'defaultTextPlaceholder',
                    cursor: 'pointer',
                    borderWidth: '2',
                    borderStyle: 'solid',
                    borderColor: {
                        base: 'box',
                        focus: 'defaultTextPlaceholder'
                    },
                    borderTopLeftRadius: '10',
                    borderTopRightRadius: '10',
                    borderBottomLeftRadius: open ? '0' : '10',
                    borderBottomRightRadius: open ? '0' : '10',
                    background: {
                        base: 'defaultBackground',
                        hover: 'filterHover'
                    },
                })}
            >
                {collectionsSelection}
                <ChevronIcon />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                className={sprinkles({
                    background: 'defaultBackground',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderWidth: '2',
                    borderTopWidth: '0',
                    borderStyle: 'solid',
                    borderColor: 'box',
                    borderBottomLeftRadius: '10',
                    borderBottomRightRadius: '10',
                    width: '220',
                })}
            >
                {options.map((option) => (
                    <DropdownMenu.Item
                        key={option.key}
                        onClick={() => {
                            mutateData()
                            setCollectionsSelection(option.name)
                        }}
                        disabled={collectionsSelection === option.key}
                        className={sprinkles({
                            paddingY: '12',
                            paddingX: '20',
                            outline: 'none',
                            fontWeight: '600',
                            background: {
                                hover: 'filterHover'
                            },
                        })}
                        aria-label={`Collection ${option.name}`}
                    >
                        {option.name}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default CollectionsMenu
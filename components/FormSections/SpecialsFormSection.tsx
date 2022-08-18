import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { PropertiesFormSectionItem } from '../FormSectionItems/PropertiesFormSectionItem'
import { LevelsFormSectionItem } from '../FormSectionItems/LevelsFormSectionItem'
import { StatsFormSectionItem } from '../FormSectionItems/StatsFormSectionItem'
import { UnlockableFormSectionItem } from '../FormSectionItems/UnlockableFormSectionItem'
import { NsfwFormSectionItem } from '../FormSectionItems/NsfwFormSectionItem'

interface Props {
    
}

export const SpecialsFormSection: FC<Props> = ({
    
}) => {
    return (
        <Box 
            as='section' 
            className={styles.formItem}
        >
            <PropertiesFormSectionItem />
            <LevelsFormSectionItem />
            <StatsFormSectionItem />
            <UnlockableFormSectionItem />
            <NsfwFormSectionItem />
        </Box>
    )
}
import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { PropertiesFormSectionItem } from '../FormSectionItems/PropertiesFormSectionItem'
import { LevelsFormSectionItem } from '../FormSectionItems/LevelsFormSectionItem'
import { StatsFormSectionItem } from '../FormSectionItems/StatsFormSectionItem'
import { UnlockableFormSectionItem } from '../FormSectionItems/UnlockableFormSectionItem'
import { NsfwFormSectionItem } from '../FormSectionItems/NsfwFormSectionItem'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { EditAssetFormType } from '../Forms/EditAssetForm'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    errors: 
        Partial<Record<keyof CreateAssetFormType, string>> |
        Partial<Record<keyof EditAssetFormType, string>>
    validate: () => void
    data: CreateAssetFormType | EditAssetFormType
    setData: (e: any) => void
}

export const SpecialsFormSection: FC<Props> = ({
    handleChange,
    errors,
    validate,
    data,
    setData
}) => {
    return (
        <Box 
            as='section' 
            className={styles.formItem}
        >
            <PropertiesFormSectionItem />
            <LevelsFormSectionItem />
            <StatsFormSectionItem />
            <UnlockableFormSectionItem 
                handleChange={handleChange}
                errors={errors}
                validate={validate}
                data={data}
            />
            <NsfwFormSectionItem 
                data={data}
                setData={setData}
            />
        </Box>
    )
}
import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'

type Props = {
  viewRef?: ReturnType<typeof useInView>['ref']
}

export const AssetGridLoadingCard: FC<Props> = ({ 
  viewRef 
}) => {
  return (
    <Box
      ref={viewRef}
    >
      <Box>
        <Box
          as='article'
          boxShadow={{
            base: 'box',
            hover: 'boxHover',
            active: 'boxHover'
          }}
          transition='default'
          display='flex'
          flexDirection='column'
          height='full'
          borderRadius='10'
          position='relative'
          overflow='hidden'
          background='white'
        >
          <NextLink
            href='/'
            borderRadius='10'
            overflow='hidden'
            display='flex'
            flexDirection='column'
            height='full'
          >
            <Box 
              aspectRatio='square'
              width='full'
              overflow='hidden'
              borderTopLeftRadius='10'
              borderTopRightRadius='10'
              position='relative'
            >
              <Box 
                display='flex'
                flexDirection='column'
                width='full'
                height='full'
              >
                <Box 
                  width='full'
                  height='full'
                  animation='shimmer'
                  style={{
                    background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(229, 232, 235, 0.5) 8%, rgb(229, 232, 235) 36%, rgba(229, 232, 235, 0.5) 66%) repeat scroll 0% 0% / 1200px',
                  }}
                />
              </Box>
            </Box>
            <Box 
              display='flex'
              flexDirection='column'
              style={{
                rowGap: '12px',
                height: '150px'
              }}
              width='full'
            >
              <Box 
                display='flex'
                flexDirection='column'
                flexGrow='1'
                flexShrink='0'
                flexBasis='0'
                width='full'
                height='full'
                padding='12'
              >
                <Box 
                  display='flex'
                  justifyContent='space-between'
                >
                  <Box 
                    height='12'
                    animation='shimmer'
                    style={{
                      width: '96px',
                      borderRadius: '100px',
                      background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(229, 232, 235, 0.5) 8%, rgb(229, 232, 235) 36%, rgba(229, 232, 235, 0.5) 66%) repeat scroll 0% 0% / 1200px',
                    }}
                  />
                </Box>
                <Box 
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                  marginTop='10'
                >
                  <Box 
                    height='12'
                    animation='shimmer'
                    style={{
                      width: '96px',
                      borderRadius: '100px',
                      background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(229, 232, 235, 0.5) 8%, rgb(229, 232, 235) 36%, rgba(229, 232, 235, 0.5) 66%) repeat scroll 0% 0% / 1200px',
                    }}
                  />
                </Box>
                <Box 
                  display='flex'
                  justifyContent='space-between'
                  marginTop='10'
                >
                  <Box 
                    height='36'
                    width='80'
                    animation='shimmer'
                    style={{
                      borderRadius: '100px',
                      background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(229, 232, 235, 0.5) 8%, rgb(229, 232, 235) 36%, rgba(229, 232, 235, 0.5) 66%) repeat scroll 0% 0% / 1200px',
                    }}
                  />
                </Box>
              </Box>
              <Box
                as='footer' 
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                height='20'
                width='full'
                marginTop='4'
                borderBottomLeftRadius='10'
                borderBottomRightRadius='10'
              >
                <Box 
                  display='flex'
                  flexDirection='column'
                  flexGrow='1'
                  flexShrink='0'
                  flexBasis='0'
                  height='full'
                  width='full'
                  paddingX='12'
                  paddingBottom='12'
                >
                  <Box 
                    display='flex'
                    justifyContent='space-between'
                  >
                    <Box 
                      height='12'
                      animation='shimmer'
                      style={{
                        width: '128px',
                        borderRadius: '100px',
                        background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(229, 232, 235, 0.5) 8%, rgb(229, 232, 235) 36%, rgba(229, 232, 235, 0.5) 66%) repeat scroll 0% 0% / 1200px',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
}
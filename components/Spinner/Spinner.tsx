
export const Spinner = () => {
    return(
        <div 
            className='spinner'
            style={{
                display: 'inline-block',
                border: '4px solid rgba(255, 255, 255, 0.1)',
                borderLeftColor: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px'
            }}
        />
    )
}
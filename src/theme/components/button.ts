interface VariantProps {
  size: 'small' | 'medium' | 'large';
  colorMode: 'light' | 'dark',
}
const getPaddings = (size: string):object => {
 const paddings = {
  'large': {
    padding: '0.875rem 1rem',
  },
  'medium': {
    padding: '0.625rem 1rem'
  },
  'small': {
    padding: '0.375rem 1rem'
  }
 }
 return paddings[size];
}
const button = { 
  baseStyle: {
     _focus: { boxShadow: 'none' } 
  },
  variants: {
    primary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      borderRadius: '0.25rem',
      height: 'auto',
      bg: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
      color: props.colorMode === 'light' ? 'nl.13' : 'nl.13',
      _hover:{
       bg: props.colorMode === 'light' ? 'pri.02' : 'pri.02',
      },
      _active: {
        bg: props.colorMode === 'light' ? 'pri.03' : 'pri.03',
      },
      _disabled: {
        pointerEvents: 'none',
        bg: props.colorMode === 'light' ? 'nl.06': 'nl.06',
        color: props.colorMode === 'light' ? 'nl.04' : 'nl.04',
        opacity: 1,
      }
    }),
    secondary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      borderRadius: '0.25rem',
      height: 'auto',
      bg: props.colorMode === 'light' ? 'nl.13' : 'nl.13',
      color: props.colorMode === 'light' ? 'nl.03' : 'nl.03',
      borderWidth: '0.063rem',
      borderColor: props.colorMode === 'light' ? 'nl.03' : 'nl.03',
      borderStyle: 'solid',
      _hover:{
        bg: props.colorMode === 'light' ? 'nl.11' : 'nl.11',
      },
      _active: {
        bg: props.colorMode === 'light' ? 'nl.12' : 'nl.12',
      },
      _disabled: {
        pointerEvents: 'none',
        bg: props.colorMode === 'light' ? 'nl.13' : 'nl.13',
        color: props.colorMode === 'light' ? 'nl.05' : 'nl.05',
        borderColor: props.colorMode === 'light' ? 'nl.05' : 'nl.05',
        opacity: 1,
      }
    }),
    tertiary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      borderRadius: '0.25rem',
      height: 'auto',
      bg: 'nl.06',
      color: props.colorMode === 'light' ? 'pri.03' : 'pri.03',
      _hover:{
        color: props.colorMode === 'light' ? 'pri.02' : 'pri.02',
      },
      _disabled: {
        pointerEvents: 'none',
        color: props.colorMode === 'light' ? 'nl.04' : 'nl.04',
        opacity: 1,
      }
    }),
    text: (props: VariantProps) => ({
      ...getPaddings(props.size),
      bg: 'transprent',
      color: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
      _hover:{
        color: props.colorMode === 'light' ? 'pri.02' : 'pri.02',
      },
      _active: {
        color: props.colorMode === 'light' ? 'pri.03' : 'pri.03',
      },
      _disabled: {
        pointerEvents: 'none',
        color:  props.colorMode === 'light' ? 'nl.05' : 'nl.05',
        opacity: 1,
      }
    }),
    'secondary-outline': (props: VariantProps) => ({
      bg: props.colorMode === 'light' ? 'nl.13' : 'nl.13',
      color: props.colorMode === 'light' ? 'nl.02' : 'nl.02',
      borderRadius: '0.25rem',
      borderWidth: '0.063rem',
      borderColor: props.colorMode === 'light' ? 'nl.05' : 'nl.05',
      borderStyle: 'solid',
      minWidth: '2rem',
      minHeight: '2rem',
      textAlign: 'center',
      padding: '0.312rem 0.25rem',
      _active: {
        borderColor: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
        color: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
      }
    })
  },
  defaultProps: {
    variant: 'primary',
  }
}

export default button;
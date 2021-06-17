
import React from 'react';
import { Radio as RadioC, RadioProps as  RadioPropsC} from '@chakra-ui/react';


const Radio  = (props : RadioPropsC):JSX.Element =>{
    return <RadioC {...props} colorScheme='pri'/>;
}
export default Radio;

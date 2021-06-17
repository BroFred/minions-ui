import React from 'react';
import { Checkbox as CheckboxC, CheckboxProps as  CheckboxPropsC} from '@chakra-ui/react';


const CheckBox  = (props : CheckboxPropsC):JSX.Element =>{
    return <CheckboxC {...props} colorScheme='pri'/>;
}
export default CheckBox
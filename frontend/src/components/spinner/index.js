import React from 'react';

import {ScaleLoader} from 'react-spinners';

export default function Spinner(){
    return(
        <ScaleLoader color={'#fff'} loading="true" size="20" margin="3"/>
    )
}
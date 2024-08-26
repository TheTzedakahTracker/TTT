
import React from 'react';
import tttLogo from './tttLogo.png';

 function LogoImg(props){

    return(

        <div>
            <img src={tttLogo} alt="logo" width={props.width} height={props.height} />
        </div>

    );//end return

}
export default LogoImg;

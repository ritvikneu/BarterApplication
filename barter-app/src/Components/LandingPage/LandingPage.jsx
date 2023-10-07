// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
// import { Menu as MenuIcon } from '@material-ui/icons';
// // import goods from './Image/goods.png';
// // import services from './Image/services.png';
// // import Electronics from './Image/Electronics.png';
// import { ImageSlide } from './slider';
// import './LandingPage.css';
// import '../../../public/'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
// import goods from './Image/goods.png';
// import services from './Image/services.png';
// import Electronics from './Image/Electronics.png';
import { ImageSlide } from './slider';
import './LandingPage.css';




// const LandingPage = () => {

// return(
//     <>
//     <div class="Section_top">
//         <div class="content">
//             <h1>Barter App <span>Trade : Goods and Services</span></h1>
//             <a href="/">Welcome</a>
//         </div>
//     </div> 
//     <img src="./" alt="Benefits Img" />
//     </>
//   );
// };

// export default LandingPage;
const LandingPage = () => {

return(
    <>
    <div class="Section_top">
        <div class="content">
            <h1>Barter App <span>Trade : Goods and Services</span></h1>
            <a href="/">Welcome</a>
        </div>
    </div> 
    <img src="../../../public/Benefits.png" alt="Benefits Img" />
    </>
  );
};

export default LandingPage;

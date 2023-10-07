import React from "react";
import '../Footer/Footer.css';

const Footer = () => {


    return(
       <>
       <div className="Ftr">
        <div className="Footer">
            <div>
            <img className="BarterLogo" src="./FinalLogo.png" alt="" />
            </div>
            
           
            <div className="List1">
                <ul>
                    <li>
                    <a href=""> Help </a>
                    </li>
                    <li>
                    <a href=""> Contact Us </a>
                    </li>
                    <li>
                    <a href=""> About </a>
                    </li>
                    <li>
                    <a href=""> Team </a>
                    </li>
                </ul>
                </div>
                <div className="LogoList">
                <img src="./Images/facebook.png" alt="facebook" />
                <img src="./Images/google.png" alt="twitter" />
                <img src="./Images/twitter.png" alt="google" />

                {/* <ul>
    
                    <li>
                        <img src="./Images/facebook.png" alt="facebook" />
                    </li>
                    <li>
                        <img src="./Images/google.png" alt="twitter" />
                    </li>
                    <li>
                        <img src="./Images/twitter.png" alt="google" />
                    </li>
                </ul> */}
                </div>
                <div className="List3">
                <ul>
                    <li>
                    <a href=""> Terms and Conditions </a>
                    </li>
                    <li>
                    <a href=""> Privacy Policy </a>
                    </li>
                    <li>
                    <a href=""> Terms of Use </a>
                    </li>
                </ul>
                </div>


            
        </div>
        </div>
        </>
    )
}

export default Footer;
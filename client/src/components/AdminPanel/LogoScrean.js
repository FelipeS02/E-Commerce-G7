import React from "react";
import Logo from "../NavBar/logo.png";
import './LogoScrean.css'

function LogoScrean(){
    

    return(
        <div className= 'logoAdminPanel' style={{
            height: '50rem', width: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0', padding: '0', margin: '0'
        }}>
            <div>
                <img
                    src={Logo}
                    width="100%"
                    height="auto"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
            </div>
        </div>
    )
}

export default LogoScrean;
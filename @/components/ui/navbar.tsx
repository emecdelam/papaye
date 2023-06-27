import { editorName, mainNav, containerHeight, links, profilePicture, inactiveLink } from "@/styles/navbar.css";
import { Link } from "@remix-run/react";
export default function Navbar(){
    return (
    <div className={mainNav}>
        <div className={containerHeight}>
            <div className={editorName}>
                Unamed Editor
            </div>
            <div className={links}>
                <Link to={'/app/projects/'}>
                    Projets
                </Link>
                <Link to={'/app/themes'} className={inactiveLink}>
                    Themes
                </Link>
            </div>
        </div>
        <img src='https://cdn.discordapp.com/attachments/1090567982205378632/1122993024037818468/BTZKj_-g-Lj-png__700.png' width='40' height='40' className={profilePicture}/>
    </div>
    )
}
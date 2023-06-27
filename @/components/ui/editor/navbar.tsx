import { ArrowLeftIcon } from "@/components/icons/arrows";

export default function EditorNavbar() {
    return (
        <>          
            <div id="editor-navbar" className="h-14 flex items-center justify-between px-4 flex-shrink-0">
                <div id="left" className="flex">
                    <ArrowLeftIcon/> 
                    Retour aux projets
                </div>
                <div id="right">
                    {/*TODO: Add avatars */}
                    right
                </div>
            </div>
        </>
    )
}
import { buttonContainer, buttonProjects, filterBox, headProjects, mainProjects, searchContainer, tagBox, yourProjects } from "@/styles/projects.css";
import { Input } from "@/components/ui/forms/input";

export default function Projects_ui(data,filter,setFilter,fetcher,navigate){
    return(
        <div className={mainProjects}>
            <div className={headProjects}>
                <div className={buttonContainer}>
                    <h1 className={yourProjects}>
                        <b>Your projects</b>
                    </h1>
                    <button className={buttonProjects}>
                        New project
                    </button>
                </div>
                <div className={searchContainer}>
                    <div className={filterBox} >
                        <Input type="text" placeholder="Filter"/>
                    </div>
                    <div className={tagBox}>
                        <Input type="text"  placeholder="Tag"/>
                    </div>
                </div>
            </div>
            
            <div>
            <table className="table-auto mt-10  mr-48  w-full border border-collapse">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-2 h-12">Name</th>
                    <th className="px-2 h-12">Last modified</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
       
            </table>
            </div>

        </div>
    )
}
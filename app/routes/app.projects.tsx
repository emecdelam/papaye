import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "~/db.server";
import { getUser } from "~/services/auth.server";
export async function loader({request}: LoaderArgs) {
    let user = await getUser(request);
    let projects = await prisma.project.findMany({
        where: {
            users: {
                some: {
                    //permission: 1, //If you want to filter out permissions ! 
                    user: {
                        email: user.email
                    }
                }
            }
        }
    })
    return json({projects})
}

export default function ProjectPage() {
    let data = useLoaderData<typeof loader>();
    let [filter, setFilter] = useState("")
    const fetcher = useFetcher();
    const navigate = useNavigate();
    
    return <div className="py-20 w-10/12">
        <div className="flex ml-16">
            <h1 className="text-4xl mr-10">Your projects</h1>
            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={() => {
                let name = prompt("Project name") || "";
                fetcher.submit({
                    name
                }, {
                    method: "post",
                })
            }}>New project</button>
        </div>
 
        <div className="w-9/12 mt-10 ml-16">
        <div className="w-full flex justify-end mx-1/12">
            <input type="text" className="rounded-md border h-10 px-2 border-gray-200 shadow-md" onChange={(e) => {setFilter(e.target.value)}} placeholder="Filter..." />
        </div>
            <table className="table-auto mt-10  mr-48  w-full border border-collapse">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-2 h-12">Name</th>
                    <th className="px-2 h-12">Last modified</th>
                </tr>
                </thead>
                <tbody>
                {data.projects.slice().filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).reverse().map(x => <>
                <tr onClick={() => {
                    navigate("/app/projects/"+x.id)
                }} className="hover:bg-gray-100 cursor-pointer">
                    <td className="px-2 border h-12 border-slate-300 capitalize">{x.name}</td>
                    <td className="px-2 border h-12 border-slate-300">{new Date(x.lastModified).toLocaleString()}</td>
                </tr>
  
                </>)}
                </tbody>
       
            </table>

        </div>


    </div>
}

export async function action({request}: ActionArgs) {
    let user = await getUser(request)
    let body = await request.formData()
    let name = body.get("name")?.toString();
    if (!name) {
        throw new Error("Project name cant be empty.")
    }
    let project = await prisma.project.create({
        data: {
            name,
            content: "",
            users: {
                create: {
                    permission: 0,
                    userId: user.id
                }
            }
        }
    })
    return null
}
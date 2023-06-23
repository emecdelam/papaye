import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
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
    const fetcher = useFetcher();
    
    return <>
        <p>Your projects</p>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={() => {
            let name = prompt("Project name") || "";
            fetcher.submit({
                name
            }, {
                method: "post",
            })
        }}>New project</button>
        <fetcher.Form/>
        <ul>
            {data.projects.map(x => <>
                <li>{x.name}</li>
            </>)}
        </ul>
   

    </>
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
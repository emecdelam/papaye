import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "~/db.server";
import { getUser } from "~/services/auth.server";
import Projects_ui from "@/components/ui/projects";
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
    
    return  <Projects_ui data={data} filter = {filter} setFilter={setFilter} fetcher={fetcher} navigate={navigate}/>

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
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/services/auth.server";

export async function loader({request}: LoaderArgs) {
    let user = await getUser(request);
    return json({user})
}

export default function ProjectPage() {
    let data = useLoaderData<typeof loader>();
    if (!data.user) {
        return <></>
    }
    return <>
        <p>Welcome to the projects page !</p>
        <p>Hello {data.user.password} </p>
    </>
}
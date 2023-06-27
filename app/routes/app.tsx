import Navbar from "@/components/ui/navbar";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { authenticator, getUser } from "~/services/auth.server";


export async function loader({request}: LoaderArgs) {
    let user = await getUser(request);
    return json({user});
}

export async function action({request}:ActionArgs) {
    let body = await request.formData();
    if (body.has("logout")) {
        await authenticator.logout(request,{
            redirectTo: "/login"
        })
    }
}

export default function AppLayout() {
    let data = useLoaderData<typeof loader>();
    return (
    <div className="w-full h-full">
        <Navbar/>
        <Outlet/>
    </div>
    )
}
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
    return <div className="w-full h-full flex">
        <div className="flex flex-col h-auto w-2/12 justify-between my-2 items-center border-r border-gray-300">
            <div className="top w-10/12 text-center">
                <h1 className="font-bold text-2xl mb-20 mt-5">Long Brand.</h1>
                <span className="block "></span>
                <NavLink className={({ isActive }) => "ease-in duration-75 block w-full  px-5 py-2 rounded-md mb-2 " + (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-300")} prefetch="intent" to="/app/projects">Projects</NavLink>
                <NavLink className={({ isActive }) => "ease-in duration-75 block w-full  px-5 py-2 rounded-md mb-2 " + (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-300")} prefetch="intent" to="/app/themes"  >Themes</NavLink>
            </div>
            <div className="bottom h-32 w-10/12 text-center">
                <p className="text-lg">{data.user.name}</p>
                <Form method="post">
                    <input type="hidden" name="logout" value="true" />
                    <button type="submit" className="h-10 px-10 mt-5 bg-gray-700 rounded-md text-white">Log out</button>
                </Form>
            </div>
        </div>
        <Outlet/>
    </div>
}
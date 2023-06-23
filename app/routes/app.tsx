import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
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
    return <>
        <div className="sidebar">
            <div className="top">
                <Link  prefetch="intent" to="/app/projects">Projects</Link>
                <Link  prefetch="intent" to="/app/themes"  >Themes</Link>
            </div>
            <div className="bottom">
                {data.user.name}
                <Form method="post">
                    <input type="hidden" name="logout" value="true" />
                    <button type="submit">Log out</button>
                </Form>
            </div>
        </div>
        <Outlet/>
    </>
}
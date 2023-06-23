import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator, getUser } from "~/services/auth.server";
import {  destroySession, getSession } from "~/services/session.server";
import { mainDiv } from "./login.css"
export default function SignUpPage() {
    const data = useLoaderData<typeof loader>();
    return <div className="h-full">
        <div className="w-full h-full grid place-items-center bg-gray-50">
            <Form method="post">
                <div className="mb-10 font-semibold text-3xl">
                <p>Happy to see you back !</p>
                </div>
                <div className="mb-5">
                    <label className="block text-md font-semibold" htmlFor="email">Email</label>
                    <input className="border border-gray-400 mt-1 rounded-md pr-20 px-5 py-2 bg-gray-50" type="email" name="email" placeholder="givemeup@nevergonna.com" />
                </div>
                <div className="mb-10">
                    <label className="block text-md font-semibold" htmlFor="password">Password </label>
                    <input className="border border-gray-400 rounded-md mt-1 pr-20 px-5 py-2" type="password" name="password" placeholder="1234" />

                </div>
                
                
                {data.error ? <div className="h-full bg-red-300 p-3 rounded-md mb-10">{data.error.message}</div> : ""}
                

                <button className="bg-blue-700 text-white rounded-md px-6 h-10 cursor-pointer " type="submit">Log in</button>
            </Form>
        </div>

 
    </div>
}

export async function action({ request }: ActionArgs) {
    // we call the method with the name of the strategy we want to use and the
    // request object, optionally we pass an object with the URLs we want the user
    // to be redirected to after a success or a failure
    return await authenticator.authenticate("form-login", request, {
      successRedirect: "/app/projects",
      failureRedirect: "/login",
    });
  };

export async function loader({request}: LoaderArgs) {
    await authenticator.isAuthenticated(request, {
        successRedirect: "/app/projects",
    });
    let session = await getSession(request.headers.get("cookie"));
    let error = session.get(authenticator.sessionErrorKey);
    return json({error}, {
        headers: {
          "Set-Cookie": await destroySession(session)
        },
      });
}
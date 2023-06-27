import { Input } from "@/components/ui/input";
import { ActionArgs, LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator, getUser } from "~/services/auth.server";
import {  destroySession, getSession } from "~/services/session.server";

export const meta: V2_MetaFunction = () => {
    return [
      { title: "Login" },
      { name: "description", content: "Login page" },
    ];
  };


export default function LoginPage() {
    const data = useLoaderData<typeof loader>();
    return <div className="h-full">
        <div className="w-full h-full grid place-items-center"  style={{backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80')", backgroundSize: "cover"}}>
            <Form method="post" className="w-1/4 bg-white rounded-md p-10 shadow">
                <div className="mb-10 font-bold text-3xl">
                <p>Happy to see you back !</p>
                </div>
                <div className="mb-5">
                    <label className="block text-md font-semibold" htmlFor="email">Email</label>
                    <Input type="email" placeholder="john@doe.com"></Input>
                </div>
                <div className="mb-10">
                    <label className="block text-md font-semibold" htmlFor="password">Password </label>
                    <Input type="password" placeholder="toto1234"></Input>
                </div>
                
                
                {data.error ? <div className="h-full bg-red-300 p-3 rounded-md mb-10">{data.error.message}</div> : ""}
                
                <div className="w-full flex justify-between items-center ">
                <button className="bg-blue-700 text-white rounded-md px-6 h-10 cursor-pointer " type="submit">Log in</button>
                <Link to="/signup" className="underline">I want to create an account.</Link>
                </div>
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
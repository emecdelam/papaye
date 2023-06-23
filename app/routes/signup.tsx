import { ActionArgs, LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator, getUser } from "~/services/auth.server";
import {  destroySession, getSession } from "~/services/session.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Signup" },
    { name: "description", content: "Signup page" },
  ];
};


export default function SignUpPage() {
    const data = useLoaderData<typeof loader>();
    return <div className="h-full">
        <div className="w-full h-full grid place-items-center bg-gray-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80')", backgroundSize: "cover"}}>
            <Form method="post" className="w-1/4  bg-white rounded-md p-10 shadow">
                <div className="mb-10 font-bold text-3xl">
                <p>Welcome !</p>
                </div>
                <div className="mb-5">
                    <label className="block text-md font-semibold" htmlFor="name">Name</label>
                    <input className="border border-gray-400 mt-1 rounded-md w-full px-5 py-2 bg-gray-50" type="text" name="name" placeholder="John Doe" />
                </div>
                <div className="mb-5">
                    <label className="block text-md font-semibold" htmlFor="email">Email</label>
                    <input className="border border-gray-400 mt-1 rounded-md w-full px-5 py-2 bg-gray-50" type="email" name="email" placeholder="john@doe.com" />
                </div>
                <div className="mb-10">
                    <label className="block text-md font-semibold" htmlFor="password">Password </label>
                    <input className="border border-gray-400 rounded-md mt-1 w-full px-5 py-2" type="password" name="password" placeholder="1234" />

                </div>
                
                
                {data.error ? <div className="h-full bg-red-300 p-3 rounded-md mb-10">{data.error.message}</div> : ""}
                
                <div className="w-full flex justify-between items-center ">
                <button className="bg-blue-700 text-white rounded-md px-6 h-10 cursor-pointer " type="submit">Create my account</button>
                <Link to="/login" className="underline">I already have an account.</Link>
                </div>
            </Form>
        </div>

 
    </div>
}

export async function action({ request }: ActionArgs) {
    // we call the method with the name of the strategy we want to use and the
    // request object, optionally we pass an object with the URLs we want the user
    // to be redirected to after a success or a failure
    return await authenticator.authenticate("form-signup", request, {
      successRedirect: "/app/projects",
      failureRedirect: "/signup",
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
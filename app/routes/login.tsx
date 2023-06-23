import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator, getUser } from "~/services/auth.server";
import {  destroySession, getSession } from "~/services/session.server";
import { mainDiv } from "./login.css"
export default function SignUpPage() {
    const data = useLoaderData<typeof loader>();
    return <div className={mainDiv}>
    
        <p>Welcome to the log in page !</p>
        <Form method="post">
            {data.error ? data.error.message : ""}
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" placeholder="givemeup@nevergonna.com" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" placeholder="1234" />

            </div>
            <button type="submit">Se connecter</button>
        </Form>
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
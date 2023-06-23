import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { commitSession, destroySession, getSession } from "~/services/session.server";
export default function SignUpPage() {
    const data = useLoaderData();
    return <>
    
        <p>Welcome to the sign up page !</p>
        <Form method="post">
            {data.error ? data.error.message : ""}
            <div>
                <label htmlFor="name">Name: </label>
              <input type="text" name="name"  placeholder="Rick Astley" />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" placeholder="givemeup@nevergonna.com" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" placeholder="1234" />

            </div>
            <button type="submit">S'inscrire</button>
        </Form>
    </>
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
    let session = await getSession(request.headers.get("cookie"));
    let error = session.get(authenticator.sessionErrorKey);
    return json({error}, {
        headers: {
          "Set-Cookie": await destroySession(session)
        },
      });
}
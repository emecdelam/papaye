import FormElement from "@/components/ui/forms/control";
import { Input } from "@/components/ui/forms/input";
import SocialButton from "@/components/ui/forms/social";
import { Label } from "@radix-ui/react-label";
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
        <div className="w-full h-full grid place-items-center"  style={{backgroundImage: "url('https://images.pexels.com/photos/1064162/pexels-photo-1064162.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1064162.jpg&fm=jpg')", backgroundSize: "cover"}}>
            <div className="w-5/12 h-7/12 bg-white rounded-md p-10 shadow">
                <div className="mb-10 font-bold text-3xl w-full text-center">
                  <p>Bienvenue sur Unamed Editor !</p>
                </div>

                <div className="flex justify-between w-full">
                  <div className="text-center w-5/12 ">       
                  
                  <Form method="post">
                  <FormElement>
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" name="name" type="email" placeholder="John Doe"/>
                    </FormElement>

                    <FormElement>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@doe.com"/>
                    </FormElement>
    
                    <FormElement>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="email" type="password" placeholder="i like potatoes"/>
                    </FormElement>
                    
                    
                    {data.error ? <div className="bg-red-300 p-2 rounded-md">{data.error.message}</div> : ""}
                    
                    <button className=" bg-blue-700 text-white rounded-md px-8 h-10 cursor-pointer mb-3 mt-4" type="submit">M'inscrire</button>
                    <br />
                    <Link to="/login" className="underline">Je possède déjà un compte</Link>
                    </Form>
                  </div>
  
                  <div className="w-1/2 border-l-2 px-10">
                    <SocialButton name="Github"/>
                    <SocialButton name="Google"/>
                    <SocialButton name="Microsoft"/>  
                  </div>
                </div>
      
         
            </div>
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
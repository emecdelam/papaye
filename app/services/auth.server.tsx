import { Authenticator } from "remix-auth"
import { sessionStorage } from "./session.server"
import { Prisma } from "@prisma/client"
import { FormStrategy } from "remix-auth-form"
import { prisma } from "~/db.server"
import { hash, verify } from "~/utils/hash"

export let authenticator = new Authenticator(sessionStorage)

authenticator.use(new FormStrategy(async ({form}) => {
    let email = form.get("email")?.toString();
    let password = form.get("password")?.toString();
    let user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (user != null) {
        let match = await verify(password || ":(", user.password || ":D")
        if (!match) {
            throw new Error("Invalid credentials.")
        }
        user.password = "B====D"
        return user
    }
    throw new Error("Invalid credentials.")
}), "form-login")

authenticator.use(new FormStrategy(async ({form}) => {
    let email = form.get("email")?.toString();
    if (!email) {
        throw new Error("Email cant be empty")
    }
    let name = form.get("name")?.toString();
    if (!name) {
        throw new Error("Name cant be empty")
    }
    let password = form.get("password")?.toString();
    if (!password) {
        throw new Error("Password cant be empty")
    }
    let hashedPassword = await hash(password)
    let user;
    try {
        user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
        user.password = "B====D" //Hide password from cookies !
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            console.log(
              'There is a unique constraint violation, a new user cannot be created with this email'
            )
            throw new Error("An account already exist with this email.")
          }
        }
      }

    return user
}), "form-signup")

export async function getUser(request: Request): Promise<{id: number, email: string, name: string}> {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    //@ts-ignore
    return user
}
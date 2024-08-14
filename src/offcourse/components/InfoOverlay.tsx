import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Logo } from "./Logo";
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { CourseCardState } from "./CourseCard";

export function InfoOverlay(
  { courseId, actions, cardState }: CourseCardState) {
  const { userName, affordances } = cardState;
  const { canAuthenticate } = affordances;
  const { hideOverlay, signOut, signIn } = actions;
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{userName || "Offcourse"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        <div className="flex w-full justify-center">
          <Logo className="w-24 h-24 mb-8 dark:fill-offwhite fill-offblack" />
        </div>
        {canAuthenticate &&
          <Button onClick={userName ? signOut : signIn} variant="outline" className="w-full">
            {userName
              ? "Sign Out"
              : <><GitHubLogoIcon className="mr-2 h-4 w-4" />
                Authenticate With Github</>
            }
          </Button>
        }
        <CardDescription>
          <a className="text-secondary" target="_blank" href="https://offcourse.io">Offcourse</a> is an open-source platform designed for online learning, leveraging the wealth of information available on the internet,
          such as blogs, video tutorials, and podcasts. The platform enables users to organize these resources into structured, shareable courses,
          facilitating a concept known as crowdlearning. This approach allows users to share their knowledge and learn from what others have shared.
        </CardDescription>
        <CardDescription>
          The platform is particularly aimed at those interested in integrating various forms of online content
          into coherent educational modules, making it a useful tool for both individual learners and educators.
        </CardDescription>
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}

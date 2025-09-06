import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className=" max-w-[1140px] p-4 mx-auto">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <Link to={"/"} >
          <span className="flex items-center gap-2 text-3xl">User Roles </span>
        </Link>

        <div className="flex">

          <Button variant="default" size="lg" asChild >
            <Link to={"create"}>Create User <CiSquarePlus className="size-6" /> </Link>
          </Button>

        </div>
      </div>
    </div>
  )
}

export default Navbar

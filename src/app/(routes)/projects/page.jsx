import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AllProjects from "@/app/(routes)/projects/components/AllProjects";

const AllPosts = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }


    return <AllProjects/>
    

    
};

export default AllPosts;

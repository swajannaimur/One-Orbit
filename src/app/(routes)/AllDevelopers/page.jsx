// import clientPromise from "@/lib/mongodb";
// import Link from "next/link";
// import React from "react";

// const page = async () => {
//   const client = await clientPromise;
//   const db = client.db(process.env.DB_NAME);
//   const collection = db.collection("users-data");

//   // Fetch all users with role 'developer'
//   const users = await collection
//     .find({ role: "developer" }, { projection: { password: 0 } })
//     .toArray();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Developers</h1>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {users.map((u) => (
//           <div
//             key={u._id.toString()}
//             className="bg-white rounded-lg shadow p-4"
//           >
//             <div className="flex items-center space-x-4">
//               <img
//                 src={u.image || ""}
//                 alt={u.name || "Profile"}
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//               <div>
//                 <h3 className="text-lg font-medium">{u.name || "No name"}</h3>
//                 <h3 className="text-sm text-gray-500 ">{u.email || ""}</h3>
//                 <p className="text-sm text-gray-500">{u.role || "Developer"}</p>
//               </div>
//             </div>

//             <div className="mt-4 flex justify-end">
//               <Link
//                 className="btn btn-sm btn-primary"
//                 href={`/AllDevelopers/${u._id.toString()}`}
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default page;
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import React from "react";
import { FiUsers } from "react-icons/fi";

const AllDevelopersPage = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users-data");

  // Fetch all users with role 'developer'
  const users = await collection
    .find({ role: "developer" }, { projection: { password: 0 } })
    .toArray();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
          <FiUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Our Developer Community
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Bringing Ideas to Life
          </span>
          <br />
          <span className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Developers
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our network of skilled developers — view their profiles,
          portfolios, and professional stories that shape the future of
          technology.
        </p>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No developers found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((u) => (
            <div
              key={u._id.toString()}
              className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-24 h-24 mb-4">
                <img
                  src={u.image || "https://i.pravatar.cc/150?u=" + u._id}
                  alt={u.name || "Profile"}
                  className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {u.name || "No name"}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {u.role || "Developer"}
              </p>
              <p className="text-sm text-gray-400 mb-4 truncate max-w-[180px]">
                {u.bio || "No bio available"}
              </p>

              <Link
                href={`/AllDevelopers/${u._id.toString()}`}
                className="mt-auto inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDevelopersPage;

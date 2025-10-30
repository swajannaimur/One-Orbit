"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        <FaGoogle size={20} /> Log in with Google
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        <FaGithub size={20} /> Log in with GitHub
      </button>
    </div>
  );
};

export default Social;

// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { FaGoogle, FaGithub } from "react-icons/fa";

// const Social = () => {
//   const [role, setRole] = useState("Developer");

//   const handleLogin = (provider) => {
//     if (!role) {
//       alert("Please select a role first!");
//       return;
//     }
//     // Pass the selected role as a query parameter to the callback URL
//     signIn(provider, { callbackUrl: `/?role=${role.toLowerCase()}` });
//   };

//   return (
//     <div className="flex flex-col gap-4 mt-6 items-center">
//       {/* Role Toggle */}
//       <div className="flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
//         <button
//           onClick={() => setRole("Developer")}
//           className={`px-4 py-2 rounded-full font-medium transition ${
//             role === "Developer"
//               ? "bg-blue-600 text-white"
//               : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//           }`}
//         >
//           Developer
//         </button>
//         <button
//           onClick={() => setRole("Client")}
//           className={`px-4 py-2 rounded-full font-medium transition ${
//             role === "Client"
//               ? "bg-blue-600 text-white"
//               : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//           }`}
//         >
//           Client
//         </button>
//       </div>

//       {/* Social Buttons */}
//       <div className="flex flex-col gap-3 w-full">
//         <button
//           onClick={() => handleLogin("google")}
//           className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full"
//         >
//           <FaGoogle size={20} /> Log in with Google
//         </button>
//         <button
//           onClick={() => handleLogin("github")}
//           className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition w-full"
//         >
//           <FaGithub size={20} /> Log in with GitHub
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Social;

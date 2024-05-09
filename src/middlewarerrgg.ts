// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default async function AuthMiddleware(request: NextRequest) {

//   if(typeof window !==undefined){
//     const token = localStorage.getItem('token');

//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/signup", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard"],
// };

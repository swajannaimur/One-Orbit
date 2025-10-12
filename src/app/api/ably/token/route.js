import Ably from "ably";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req) {
  try {
    // verify user session
    const session = await getServerSession(authOptions);
    const clientId = session?.user?.id ? String(session.user.id) : null;

    console.log(clientId);

    const ablyKey = process.env.ABLY_API_KEY;
    if (!ablyKey) {
      return NextResponse.json(
        { error: "ABLY_API_KEY not configured" },
        { status: 500 }
      );
    }

    const rest = new Ably.Rest({ key: ablyKey });

    // Create token request with optional clientId to tie presence to NextAuth user id
     const tokenRequest = await rest.auth.createTokenRequest({ clientId });

    return NextResponse.json(tokenRequest);
  } catch (err) {
    console.error("Error creating Ably token:", err);
    return NextResponse.json(
      { error: "Failed to create Ably token" },
      { status: 500 }
    );
  }
}

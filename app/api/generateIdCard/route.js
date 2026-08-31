import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import MemberA from "@/models/Active";
import MemberD from "@/models/Doner";
import { NextResponse } from "next/server";


export async function POST(request) {
  let memberType = "Thank You For Accepting The Membership.";

  try {
    await connectDB();

    const { mobileNumber } = await request.json();
    if (!mobileNumber) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    let member = await Member.findOne({ mob: mobileNumber });
    if (!member) {
      member = await MemberA.findOne({ mob: mobileNumber });
      memberType = "Thank you for accepting the active membership.";

      if (!member) {
        member = await MemberD.findOne({ mob: mobileNumber });
        memberType = "Thank you for supporting the organization.";

        if (!member) {
          return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
      }
    }

    return NextResponse.json({ ...member._doc, MEMBER_TYPE: memberType }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

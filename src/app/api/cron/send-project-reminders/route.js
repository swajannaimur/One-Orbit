import { NextResponse } from "next/server";
import { getDueProjects, markProjectReminderSent } from "@/lib/projects";
import { sendEmail } from "@/utils/sendEmail";

export async function GET(request) {
  // Add cron secret for security
  // const secret = request.headers.get("x-cron-secret");
  // if (secret !== process.env.CRON_SECRET) {
  //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  // }

  let sent = 0;
  try {
    const due = await getDueProjects();
    for (const prj of due) {
      try {
        const subject = `Reminder: Project "${prj?.name}" deadline reached`;
        const text = `Hello,\n\nThis is a reminder that your project "${
          prj?.name
        }" had a deadline of ${prj?.deadline?.toISOString()}.\n\nBest regards.`;
        // optionally HTML version:
        const html = `<p>Hello,</p><p>This is a reminder that your project <strong>${
          prj?.name
        }</strong> had a deadline of ${prj?.deadline?.toISOString()}.</p>`;
        await sendEmail({ to: prj?.clientEmail, subject, text, html });
        await markProjectReminderSent(prj._id);
        sent++;
      } catch (err) {
        console.error("Error sending project reminder", prj._id, err);
        // skip or retry later
      }
    }
    return NextResponse.json({ sent });
  } catch (err) {
    console.error("Cron route error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

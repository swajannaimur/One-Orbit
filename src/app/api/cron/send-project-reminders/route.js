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
    const due = await getDueProjects() || [];
    for (const projects of due) {
      for (const dev of projects.members) {
        try {
          const subject = `Reminder: Project "${projects?.projectName}" deadline reached`;
          const html = `<p>Hello,</p><p>This is a reminder that your project <strong>${
            projects?.projectName
          }</strong> had a deadline of ${projects?.deadline?.toISOString()}.</p>`;
          await sendEmail({ to: dev, subject, html });
          await markProjectReminderSent(projects._id);
          sent++;
        } catch (err) {
          console.error("Error sending project reminder", projects._id, err);
          // skip or retry later
        }
      }
    }
    return NextResponse.json({ sent });
  } catch (err) {
    console.error("Cron route error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

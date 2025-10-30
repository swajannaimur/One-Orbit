import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const POST = async (req) => {
	try {
		const body = await req.json();
		const { projectId, projectName, devEmail: developerEmail } = body;

		if (!projectId || !developerEmail || !projectName) {
			return NextResponse.json({
				success: false,
				error: "Missing required headers",
			});
		}

		// database connection
		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection("assigned");
		const postsCollection = db.collection("posts");

		// converting projectId to ObjectId format
		let mongoProjectId;
		try {
			mongoProjectId = new ObjectId(projectId);
		} catch (err) {
			mongoProjectId = projectId;
		}

		// searching in "assigned" collection **
		const existingProject = await collection.findOne({
			projectId: mongoProjectId,
		});

		// "assigned" collection a jodi ei project ta exist kore
		if (existingProject) {
			// developer ta ki already ei project a assigned ache?
			if (existingProject.developers?.includes(developerEmail)) {
				return NextResponse.json({
					success: true,
					alreadyAssigned: true,
				});
			}
			// jodi developer ta already not exist
			else {
				// Push new developer
				const updated = await collection.updateOne(
					{ projectId: mongoProjectId },
					{ $push: { developers: developerEmail } }
				);

				// searching the project in "posts" collection
				const postsDocument = await postsCollection.findOne({
					_id: mongoProjectId,
				});
				if (!postsDocument) {
					return NextResponse.json({
						success: false,
						error: "No matching post found with this id",
					});
				}

				// Update posts collection
				await postsCollection.updateOne(
					{ projectId: mongoProjectId },
					{
						$set: {
							assigned: true,
							members: [
								...(existingProject.developers || []),
								developerEmail,
							],
						},
					},
					{ upsert: true }
				);

				return NextResponse.json({
					success: true,
					message: "Developer added to existing project",
				});
			}
		} else {
			// Not found, create new document
			const newProject = {
				projectId: mongoProjectId,
				projectName,
				developers: [developerEmail],
				status: "assigned",
				assignedAt: new Date(),
			};
			const result = await collection.insertOne(newProject);

			// Update posts collection
			await postsCollection.updateOne(
				{ projectId: mongoProjectId },
				{
					$set: { assigned: true },
					$push: { members: developerEmail },
				}
			);

			return NextResponse.json({
				success: true,
				insertedId: result.insertedId,
				message: "New assigned record created",
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: error.message });
	}
};

export async function GET(req) {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection("assigned");

		const projects = await collection.find().toArray();

		return new Response(JSON.stringify(projects), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching assigned projects:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch assigned projects" }),
			{ status: 500 }
		);
	}
}

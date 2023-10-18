import { app } from "./app";

const PORT = Bun.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`⚡️ Listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err: TypeError) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

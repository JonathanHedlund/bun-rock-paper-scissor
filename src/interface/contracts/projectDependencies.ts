import type { DatabaseService } from "../../application/contracts/databaseService";

export type ProjectDependencies = {
	databaseService: DatabaseService;
};

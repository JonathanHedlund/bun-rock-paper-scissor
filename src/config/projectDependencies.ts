import { memoryDatabaseService } from "../frameworks/database/memory/memoryDatabaseService";

import type { ProjectDependencies } from "../interface/contracts/projectDependencies";

export const projectDependencies: ProjectDependencies = {
	databaseService: memoryDatabaseService(),
};

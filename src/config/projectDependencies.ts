import { ProjectDependencies } from "../interface/contracts/projectDependencies";
import { databaseService } from "../frameworks/database/memory/memoryDatabaseService";

export const projectDependencies: ProjectDependencies = {
	databaseService: databaseService,
};

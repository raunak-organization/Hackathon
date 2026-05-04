export type PopulatedProject = {
  _id: string;
  name: string;
  repoUrl: string;
};

export type DeploymentLean = {
  _id: string;
  projectId: PopulatedProject;
  createdAt: Date;
};

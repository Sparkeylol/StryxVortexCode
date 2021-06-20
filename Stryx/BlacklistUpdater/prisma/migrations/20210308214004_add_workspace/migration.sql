-- CreateTable
CREATE TABLE "workspace" (
    "id" SERIAL NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "workspaceName" TEXT NOT NULL,
    "members" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workspace.workspaceId_unique" ON "workspace"("workspaceId");

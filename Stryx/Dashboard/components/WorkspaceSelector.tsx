import { workspace } from '@prisma/client';
import { useRouter } from 'next/router';

import Select from 'react-select';

const WorkspaceSelector = ({ workspaces }: { workspaces: workspace[] }): JSX.Element => {
  const router = useRouter();

  const mappedWorkspaces = workspaces.map((w) => ({
    value: w.workspaceId, label: w.workspaceName,
  }));

  let snowflake: string;
  let snowflakeLabel: string;

  if (router.query.snowflake) {
    snowflake = router.query.snowflake as string;
    snowflakeLabel = workspaces.find((w) => w.workspaceId === snowflake).workspaceName;
  }

  return (
    <div className="w-full">
      <Select
        options={mappedWorkspaces}
        placeholder="Select a Workspace..."
        onChange={({ value }) => { router.push(`/workspace/${value}`); }}
        defaultValue={({ value: snowflake, label: snowflakeLabel })}
      />
    </div>
  );
};

export default WorkspaceSelector;

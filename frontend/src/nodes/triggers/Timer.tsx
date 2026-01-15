import { Position, Handle } from "@xyflow/react";

export type TimeNodeMetadata = {
  time: number;
};

const Timer = ({
  data,
}: {
  data: {
    metadata: TimeNodeMetadata;
  };
  isConnectable: boolean;
}) => {
  return (
    <div className="border p-4">
      Every {data.metadata.time / 3600} seconds
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
};

export default Timer;

import { Position, Handle } from "@xyflow/react";
import type { TimerNodeMetadata } from "common/types";

const Timer = ({
  data,
}: {
  data: {
    metadata: TimerNodeMetadata;
  };
  isConnectable: boolean;
}) => {
  return (
    <div className="border p-4">
      Every {data.metadata.time} seconds
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
};

export default Timer;

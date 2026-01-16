import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { NodeKind, NodeMetadata } from "./CreateWorkFlow";
import { useState } from "react";
import { Input } from "./ui/input";
import type { TradingMetadata } from "common/types";
import { SUPPORTED_ASSETS } from "common/types";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    Description: "Place a trade on Hyperliquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    Description: "Place a trade on lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    Description: "Place a trade on Backpack",
  },
];

const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Select the type of action that you need
          </SheetDescription>
          <Select
            value={selectedAction}
            onValueChange={(value) => setSelectedAction(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_ACTIONS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {(selectedAction === "hyperliquid" ||
            selectedAction === "lighter" ||
            selectedAction === "backpack") && (
            <div>
              <div className="pt-4">Type</div>
              <Select
                value={metadata?.type}
                onValueChange={(value) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    type: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"long"}>LONG</SelectItem>
                    <SelectItem value={"short"}>SHORT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="pt-4">Symbol</div>
              <Select
                value={metadata?.symbol}
                onValueChange={(value) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    symbol: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_ASSETS.map((asset) => (
                      <SelectItem key={asset} value={asset}>
                        {asset}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="pt-4">Qty</div>
              <Input
                value={metadata.time}
                onChange={(e) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    qty: Number(e.target.value),
                  }))
                }
              />
            </div>
          )}
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metadata);
            }}
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ActionSheet;

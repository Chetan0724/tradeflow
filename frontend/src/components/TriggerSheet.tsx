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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimeNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    Description: "Run this trigger every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    Description:
      "Runs whenever the price goes above or below a certain number for an asset",
  },
];

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<
    PriceTriggerMetadata | TimeNodeMetadata
  >({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id
  );

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need
          </SheetDescription>
          <Select
            value={selectedTrigger}
            onValueChange={(value) => setSelectedTrigger(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedTrigger === "timer" && (
            <div>
              <div className="pt-4">
                Number of seconds after which to run the timer
              </div>
              <Input
                value={metadata.time}
                onChange={(e) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    time: Number(e.target.value),
                  }))
                }
              />
            </div>
          )}

          {selectedTrigger === "price-trigger" && (
            <div>
              Price:
              <Input
                type="text"
                onChange={(e) =>
                  setMetadata((m) => ({ ...m, price: Number(e.target.value) }))
                }
              />
              Asset
              <Select
                value={metadata.asset}
                onValueChange={(value) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    asset: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_ASSETS.map((id) => (
                      <SelectItem key={id} value={id}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger, metadata);
            }}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TriggerSheet;

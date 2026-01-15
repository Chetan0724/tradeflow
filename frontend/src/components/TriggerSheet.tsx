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

const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState({});
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
              <SelectValue placeholder="Select a fruit" />
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

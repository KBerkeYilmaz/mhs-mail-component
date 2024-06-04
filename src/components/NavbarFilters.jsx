import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Tags, CircleUserRound, ListOrdered, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const NavbarFilters = ({ labels, accounts, onFilterChange }) => {
  const [selectedLabels, setSelectedLabels] = React.useState([]);
  const [searchLabel, setSearchLabel] = React.useState("");

  const handleLabelChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLabels((prev) =>
      checked ? [...prev, value] : prev.filter((label) => label !== value)
    );
  };

  React.useEffect(() => {
    onFilterChange(selectedLabels);
  }, [selectedLabels]);

  const handleSearchLabelChange = (event) => {
    setSearchLabel(event.target.value);
  };

  const filteredLabels = labels.filter((label) =>
    label.label.toLowerCase().includes(searchLabel.toLowerCase())
  );

  return (
    <>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem
            value="item-1"
            className="relative"
          >
            <AccordionTrigger>
              <Tags className="absolute left-2 top-4.5 h-4 w-4 text-muted-foreground" />
              <span className="pl-8 text-sm">Filter by label</span>
            </AccordionTrigger>
            <AccordionContent>
              <form>
                {/* <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 pr-8"
                    value={searchLabel}
                    onChange={handleSearchLabelChange}
                  />
                  <X
                    className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={() => setSearchLabel("")}
                  />
                </div> */}
                <div>
                  {filteredLabels.map((label, index) => (
                    <div
                      key={`label-${label.label}`}
                      className="flex items-center gap-2"
                    >
                      <Input
                        type="checkbox"
                        id={`label-${label.label}`}
                        name={label.label}
                        value={label.label}
                        className="w-4"
                        onChange={handleLabelChange}
                      />
                      <Label htmlFor={`label-${label.label}`}>
                        {label.label} ({label.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem
            value="item-2"
            className="relative"
          >
            <AccordionTrigger>
              <ListOrdered className="absolute left-2 top-4.5 h-4 w-4 text-muted-foreground" />
              <span className="pl-8 text-sm">Filter by campaign</span>
            </AccordionTrigger>
            <AccordionContent>
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8"
                  />
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem
            value="item-3"
            className="relative"
          >
            <AccordionTrigger>
              <CircleUserRound className="absolute left-2 top-4.5 h-4 w-4 text-muted-foreground" />
              <span className="pl-8 text-sm">Filter by account</span>
            </AccordionTrigger>
            <AccordionContent>
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8"
                  />
                </div>
                {/* <div>
                  {accounts.map((account, index) => (
                    <div key={`account-${account}`}>
                      <input
                        type="checkbox"
                        id={`account-${account}`}
                        name={account}
                        value={account}
                      />
                      <label htmlFor={`account-${account}`}>{account}</label>
                    </div>
                  ))}
                </div> */}
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default NavbarFilters;

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Search, Tags, CircleUserRound, ListOrdered } from "lucide-react";
import { Input } from "@/components/ui/input";

const NavbarFilters = ({
  labels,
  accounts,
  onFilterChange,
  onEmailFilterChange,
  onCampaignFilterChange,
  isCollapsed,
}) => {
  const [selectedLabels, setSelectedLabels] = React.useState([]);
  const [searchLabel, setSearchLabel] = React.useState("");
  const [searchEmail, setSearchEmail] = React.useState("");
  const [searchCampaign, setSearchCampaign] = React.useState("");

  const handleLabelChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLabels((prev) =>
      checked ? [...prev, value] : prev.filter((label) => label !== value)
    );
  };

  React.useEffect(() => {
    onFilterChange(selectedLabels);
  }, [selectedLabels]);

  const handleSearchEmailChange = (event) => {
    const { value } = event.target;
    setSearchEmail(value);
    onEmailFilterChange(value);
  };

  const handleSearchCampaignChange = (event) => {
    const { value } = event.target;
    setSearchCampaign(value);
    onCampaignFilterChange(value);
  };

  const filteredLabels = labels.filter((label) =>
    label.label.toLowerCase().includes(searchLabel.toLowerCase())
  );

  return (
    <>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {!isCollapsed ? (
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
                          checked={selectedLabels.includes(label.label)}
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
        ) : (
          <Tags className="absolute left-5 top-8 h-6 w-5 text-foreground" />
        )}
      </div>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {!isCollapsed ? (
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
                      value={searchCampaign}
                      onChange={handleSearchCampaignChange}
                    />
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <ListOrdered className="absolute left-5 top-14 h-6 w-5 text-foreground" />
        )}
      </div>
      <div className="bg-background/95 px-4 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {!isCollapsed ? (
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
                <span className="pl-8 text-sm">Filter by email</span>
              </AccordionTrigger>
              <AccordionContent>
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      className="pl-8"
                      value={searchEmail}
                      onChange={handleSearchEmailChange}
                    />
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <CircleUserRound className="absolute left-5 top-20 h-6 w-5 text-foreground" />
        )}
      </div>
    </>
  );
};

export default NavbarFilters;

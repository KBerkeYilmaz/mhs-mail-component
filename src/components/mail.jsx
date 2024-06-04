import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import {columns} from "@/components/LeadDataTable/columns";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "components/LeadDataTable/data-table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "@/components/account-switcher";
import { MailDisplay } from "@/components/mail-display";
import { MailList } from "@/components/mail-list";
import { Nav } from "@/components/nav";
import { accounts, mails } from "@/data/mails";
import { useMail } from "@/components/use-mail";
import NavbarFilters from "./NavbarFilters";

const Mail = ({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [labelFilters, setLabelFilters] = React.useState([]);

  const labels = mails.map((mail) => mail.labels);

  const uniqueLabels = labels.reduce((acc, labelArray) => {
    labelArray.forEach((label) => {
      if (acc[label.toLowerCase()]) {
        acc[label.toLowerCase()]++;
      } else {
        acc[label.toLowerCase()] = 1;
      }
    });
    return acc;
  }, {});

  const uniqueLabelsArray = Object.keys(uniqueLabels).map((label) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1), // Capitalize the first letter
    count: uniqueLabels[label],
  }));

  const handleFilterChange = (selectedLabels) => {
    setLabelFilters(selectedLabels.map((label) => label.toLowerCase()));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredMails = mails;

  // First filter by labels if there are any selected
  if (labelFilters.length > 0) {
    filteredMails = filteredMails.filter((mail) =>
      labelFilters.every((filter) =>
        mail.labels.map((label) => label.toLowerCase()).includes(filter)
      )
    );
  }

  // Then filter by search query if there is any
  if (searchQuery) {
    filteredMails = filteredMails.filter((mail) =>
      new RegExp(searchQuery, "i").test(mail.subject)
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher
              isCollapsed={isCollapsed}
              accounts={accounts}
            />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: `${mails.length}`,
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <NavbarFilters
            labels={uniqueLabelsArray}
            accounts={accounts}
            onFilterChange={handleFilterChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <TabsContent
              value="all"
              className="m-0"
            >
              <DataTable
                columns={columns}
                data={mails}
              />
              {/* <MailList items={filteredMails} /> */}
            </TabsContent>
            <TabsContent
              value="unread"
              className="m-0"
            >
              <MailList items={filteredMails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          minSize={28}
        >
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;

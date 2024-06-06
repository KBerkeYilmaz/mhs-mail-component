import * as React from "react";
import { File, Inbox, Send } from "lucide-react";
import { columns } from "@/components/MailDataTable/columns";
import { DataTable } from "components/MailDataTable/data-table";
import { cn } from "@/lib/utils";
import tasks from "@/components/MailDataTable/data/tasks";
import { useMailStore } from "store/mailStore";
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
import { Nav } from "@/components/nav";
import { accounts, mails } from "@/data/mails";
import { useMail } from "@/components/use-mail";
import NavbarFilters from "./NavbarFilters";

function parseTasks(tasks) {
  return tasks.map((task) => ({
    id: task.id || "",
    name: task.name || "",
    email: task.email || "",
    subject: task.subject || "",
    text: task.text || "",
    date: task.date || "",
    read: task.read || false,
    labels: task.labels || [],
    campaign: task.campaign || "",
  }));
}

export async function getTasks() {
  // Simulate async behavior if needed (e.g., fetching from an API)
  return new Promise((resolve) => {
    const parsedTasks = parseTasks(tasks);
    resolve(parsedTasks);
  });
}

const Mail = ({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail, setMail] = useMail();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [labelFilters, setLabelFilters] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [emailFilter, setEmailFilter] = React.useState("");
  const [campaignFilter, setCampaignFilter] = React.useState("");

  const {
    selectedMailId,
    isMailDisplayOpen,
    setSelectedMailId,
    closeMailDisplay,
  } = useMailStore();

  React.useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleRowClick = (row) => {
    setSelectedMailId(row.original.id);
  };

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

  const handleEmailFilterChange = (email) => {
    setEmailFilter(email.toLowerCase());
  };

  const handleCampaignFilterChange = (campaign) => {
    setCampaignFilter(campaign.toLowerCase());
  };

  let filteredMails = tasks;

  // First filter by labels if there are any selected
  if (labelFilters.length > 0) {
    filteredMails = filteredMails.filter((mail) =>
      labelFilters.every((filter) =>
        mail.labels.map((label) => label.toLowerCase()).includes(filter)
      )
    );
  }

  if (emailFilter) {
    filteredMails = filteredMails.filter((mail) =>
      mail.email.toLowerCase().includes(emailFilter)
    );
  }

  // Filter by campaign
  if (campaignFilter) {
    filteredMails = filteredMails.filter(
      (mail) =>
        mail.campaign && mail.campaign.toLowerCase().includes(campaignFilter)
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
        className="h-full items-stretch"
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
            onEmailFilterChange={handleEmailFilterChange}
            onCampaignFilterChange={handleCampaignFilterChange}
            isCollapsed={isCollapsed}
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
            <TabsContent
              value="all"
              className="m-0"
            >
              <DataTable
                columns={columns}
                data={filteredMails}
              />
              {/* <MailList items={filteredMails} /> */}
            </TabsContent>
            <TabsContent
              value="unread"
              className="m-0"
            >
              <DataTable
                columns={columns}
                data={filteredMails.filter((item) => !item.read)}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        {isMailDisplayOpen && (
          <ResizablePanel
            defaultSize={defaultLayout[2]}
            minSize={28}
          >
            <MailDisplay
              mail={tasks.find((item) => item.id === selectedMailId) || null}
              onClose={closeMailDisplay}
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;

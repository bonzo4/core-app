import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AmbassadorBounties from "./AmbassadorBounties";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { SetStateAction } from "react";
import { Role, UserRole } from "@/lib/hooks/useUserRoles";

type BountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
  userRole: Role | undefined;
};

export default function Bounties({
  supabase,
  userId,
  userRole,
}: BountiesProps) {
  return (
    <Tabs defaultValue="ambassador" className="w-full h-full pt-10 px-10">
      <TabsList className="bg-black border-[3px] border-white">
        <TabsTrigger value="ambassador">Ambassador Bounties</TabsTrigger>
      </TabsList>
      <TabsContent value="ambassador" className="">
        <AmbassadorBounties
          supabase={supabase}
          userId={userId}
          userRole={userRole}
        />
      </TabsContent>
    </Tabs>
  );
}

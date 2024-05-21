import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AmbassadorBounties from "./AmbassadorBounties";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { SetStateAction } from "react";

type BountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
};

export default function Bounties({ supabase, userId }: BountiesProps) {
  return (
    <Tabs defaultValue="ambassador" className="w-full h-full p-10">
      <TabsList>
        <TabsTrigger value="ambassador">Ambassador Bounties</TabsTrigger>
      </TabsList>
      <TabsContent value="ambassador">
        <AmbassadorBounties supabase={supabase} userId={userId} />
      </TabsContent>
    </Tabs>
  );
}

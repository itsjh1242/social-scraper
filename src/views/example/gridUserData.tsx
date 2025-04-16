// hook
import { useExampleHook } from "@/hooks";
// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// icon
import { Loading } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import {
  BuildingIcon,
  MailIcon,
  MapPinHouseIcon,
  PanelTopIcon,
  PhoneIcon,
} from "lucide-react";

const GridUserData = () => {
  // hook
  const { loading, users } = useExampleHook();

  if (loading) return <Loading text={loading} />;
  return (
    <>
      {/* data section */}
      <div className="grid grid-cols-3 gap-3">
        {users &&
          users.map((item, idx) => {
            return (
              <Card key={`${item.id}-${idx}`}>
                <CardHeader>
                  <CardTitle>
                    {item.name}
                    <span className="text-sm text-gray-600">{` (${item.username})`}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MailIcon size={16} />
                    {item.email}
                  </CardDescription>
                  <CardContent className="p-0">
                    <Separator className="my-[12px]" />
                    <div className="flex flex-col">
                      <div className="mb-[4px] flex items-center gap-1">
                        <MapPinHouseIcon size={16} />
                        <h1>Address</h1>
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="text-[14px]">{`street: ${item.address.street}`}</p>
                        <p className="text-[14px]">{`suite: ${item.address.suite}`}</p>
                        <p className="text-[14px]">{`city: ${item.address.city}`}</p>
                        <p className="text-[14px]">{`zipcode: ${item.address.zipcode}`}</p>
                        <p className="text-[14px]">{`geo: ${item.address.geo.lat}, ${item.address.geo.lng}`}</p>
                      </div>
                    </div>
                    <Separator className="my-[12px]" />
                    <div className="mb-[4px] flex items-center gap-1">
                      <PhoneIcon size={16} />
                      <h1>Phone</h1>
                    </div>
                    <p className="text-[14px]">{item.phone}</p>
                    <Separator className="my-[12px]" />
                    <div className="mb-[4px] flex items-center gap-1">
                      <PanelTopIcon size={16} />
                      <h1>Website</h1>
                    </div>
                    <p className="text-[14px]">{item.website}</p>
                    <Separator className="my-[12px]" />
                    <div className="mb-[4px] flex items-center gap-1">
                      <BuildingIcon size={16} />
                      <h1>Company</h1>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-[14px]">{`name: ${item.company.name}`}</p>
                      <p className="text-[14px]">{`catchPhrase: ${item.company.catchPhrase}`}</p>
                      <p className="text-[14px]">{`bs: ${item.company.bs}`}</p>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default GridUserData;

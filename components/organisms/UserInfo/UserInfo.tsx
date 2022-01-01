import { BaseCard } from "@components/atoms/BaseCard";
import { Button } from "@components/atoms/Button";
import { IconLabel } from "@components/atoms/IconLabel";
import {
  AtSymbolIcon,
  CakeIcon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { getUser } from "@lib/services/user/getUser";
import { signOut, useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { User } from "types/user";

export const UserInfo: FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (session) getUser(session.user.id).then(setUser);
  }, [session]);

  if (!user) return null;
  else
    return (
      <BaseCard className="space-y-1">
        <div className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
        <IconLabel
          icon={<AtSymbolIcon className="w-6 text-neutral-600" />}
          value={user.mail}
        />
        <IconLabel
          icon={<CakeIcon className="w-6 text-neutral-600" />}
          value={new Date(user.birthDate).toLocaleDateString()}
        />
        <IconLabel
          icon={<HomeIcon className="w-6 text-neutral-600" />}
          value={user.address}
        />
        <IconLabel
          icon={<PhoneIcon className="w-6 text-neutral-600" />}
          value={user.phoneNumber}
        />
        <div>
          <Button variant="tertiary" onClick={() => signOut()}>
            <span className="text-yellow-700">Se déconnecter</span>
          </Button>
        </div>
      </BaseCard>
    );
};

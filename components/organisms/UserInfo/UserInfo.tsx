import { BaseCard } from "@components/atoms/BaseCard";
import { Button } from "@components/atoms/Button";
import { IconLabel } from "@components/atoms/IconLabel";
import { Role, User } from "@customTypes/user";
import {
  AtSymbolIcon,
  CakeIcon,
  HomeIcon,
  KeyIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { updateUserRole } from "@lib/services/user/updateUserRole";
import { signOut, useSession } from "next-auth/react";
import { FC, useMemo } from "react";

export type UserInfoProps = {
  user: User;
  refresh?: () => void;
};

export const UserInfo: FC<UserInfoProps> = ({ user, refresh }) => {
  const { data: session } = useSession();
  const isAdmin = useMemo(() => user.role === Role.ADMIN, [user.role]);

  return (
    <BaseCard className="space-y-1">
      <h1 className="text-2xl">{`${user?.firstName} ${user?.lastName}`}</h1>
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
      {isAdmin && (
        <IconLabel
          icon={<KeyIcon className="w-6 text-neutral-600" />}
          value="Est administrateur"
        />
      )}
      {!isAdmin && session?.user.role === Role.ADMIN && (
        <div>
          <Button
            variant="tertiary"
            onClick={() => updateUserRole(user._id, Role.ADMIN).then(refresh)}
          >
            <span className="text-primary-700">
              Faire devenir administrateur
            </span>
          </Button>
        </div>
      )}
      {session?.user.id === user._id && (
        <div>
          <Button variant="tertiary" onClick={() => signOut()}>
            <span className="text-yellow-700">Se déconnecter</span>
          </Button>
        </div>
      )}
    </BaseCard>
  );
};

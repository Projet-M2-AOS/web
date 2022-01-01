import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserInfo } from "@components/organisms/UserInfo";
import { Role, User } from "@customTypes/user";
import { getUsers } from "@lib/services/user/getUsers";
import { useSession } from "next-auth/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const limit = 10;

export const ManageUsers: FC = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const total = useMemo(() => users.length, [users]);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);

  const searchUsers = useCallback(() => {
    if (session?.user.id) getUsers().then(setUsers);
  }, [session]);

  useEffect(searchUsers, [searchUsers]);

  if (session?.user.role !== Role.ADMIN) return null;
  else
    return (
      <ListItems className="w-full max-w-3xl bg-white">
        <h2 className="p-2.5 text-xl text-center">Tous les Utilisateurs</h2>
        <div className="flex flex-wrap justify-center gap-4 px-4 py-6">
          {users.slice(page * limit, (page + 1) * limit).map((user) => (
            <UserInfo key={user._id} user={user} refresh={searchUsers} />
          ))}
        </div>
        <UserPagination
          currentPage={page}
          maxPage={maxPage}
          setPage={setPage}
        />
      </ListItems>
    );
};

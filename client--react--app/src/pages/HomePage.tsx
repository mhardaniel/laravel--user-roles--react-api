import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import { useUserStore } from "@/store/userStore";
import { useRoleStore } from "@/store/roleStore";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const HomePage = () => {

  const { fetchUsers, users } = useUserStore();
  const { fetchRoles, roles } = useRoleStore();
  const [role, setRole] = useState<string>('admin');

  useEffect(() => {
    fetchUsers(role);

  }, [fetchUsers, role]);

  useEffect(() => {
    fetchRoles();

  }, [fetchRoles]);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="w-full p-5">
        <div className="flex">
          <h1 className="text-2xl mb-5">Current Users</h1>
          <Select defaultValue="admin" onValueChange={(role) => setRole(role)}>
            <SelectTrigger className="w-[180px] ml-auto bg-secondary">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role.toUpperCase()}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Full Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">Roles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.map(role => role).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (

          <span className="flex justify-center gap-2">No users found 😢<Link to={"create"} className="text-blue-500 hover:underline"> Create a user </Link></span>

        )}
      </div>
    </div>
  )
}

export default HomePage

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from '@nextui-org/react'
import { EyeIcon } from './EyeIcon'
import { DeleteIcon } from './DeleteIcon'
import { columns, users } from './data'
import { deleteUser } from '@/services/api'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

export default function UserList() {
  const handleDeleteUser = (userId) => {
    console.log(userId)
    calldeleteUser(userId)
  }
  const calldeleteUser = async (userId) => {
    console.log('deleted!')
    try {
      const response = await deleteUser(userId)
      console.log(response)
    } catch (error) {
      console.error('Failed to delete user:', error)
      // Handle error, e.g., show a notification
    }
  }

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Nationality</TableColumn>
          <TableColumn>Birthday</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>
                <User
                  avatarProps={{ radius: 'lg', src: user.profileImage }}
                  description={user.email}
                  name={user.name}
                >
                  {user.email}
                </User>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {user.nationality}
                  </p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {user.city}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[user.birthday]}
                  size="sm"
                  variant="flat"
                >
                  {user.birthday}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete user">
                    <span
                      className="cursor-pointer text-lg text-danger active:opacity-50"
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

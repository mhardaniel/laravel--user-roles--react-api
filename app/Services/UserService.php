<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    protected User $userModel;

    protected Role $roleModel;

    public function __construct(User $user, Role $role)
    {
        $this->userModel = $user;
        $this->roleModel = $role;
    }

    public function handleCreateUserWithRoles(array $validatedData): User|Collection
    {
        $roleIds = $this->roleModel->getRoleIds($validatedData['roles']);

        $user = $this->userModel->query()->create($validatedData);

        $user->roles()->attach($roleIds);

        return $user->load('roles');

    }
}

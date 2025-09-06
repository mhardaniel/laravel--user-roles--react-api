<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Services\HandleGeneralErrorService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class UserController extends Controller
{
    protected $handleGeneralErrorService;

    protected $userService;

    protected Role $roleModel;

    protected User $userModel;

    public function __construct(User $user, Role $role, HandleGeneralErrorService $handleGeneralErrorService, UserService $userService)
    {
        $this->userModel = $user;
        $this->roleModel = $role;
        $this->handleGeneralErrorService = $handleGeneralErrorService;
        $this->userService = $userService;
    }

    /**
     * returns a list of the users by role.
     */
    public function getUsersByRole(string $roleName): JsonResponse|JsonResource
    {
        try {
            $role = $this->roleModel->getRoleByName($roleName);
            if (! $role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Role not found'], 404);
            }

            return UserResource::collection($this->userModel->getUsersByRole($role));

        } catch (\Throwable|\Exception $e) {

            return $this->handleGeneralErrorService->log($e);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        try {

            $user = $this->userService->handleCreateUserWithRoles($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => new UserResource($user),
            ], 201);

        } catch (\Throwable|\Exception $e) {

            return $this->handleGeneralErrorService->log($e);

        }

    }
}

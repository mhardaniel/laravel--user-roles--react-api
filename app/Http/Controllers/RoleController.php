<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleCollection;
use App\Models\Role;
use App\Services\HandleGeneralErrorService;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    protected $handleGeneralErrorService;

    protected Role $roleModel;

    public function __construct(Role $role, HandleGeneralErrorService $handleGeneralErrorService)
    {
        $this->roleModel = $role;
        $this->handleGeneralErrorService = $handleGeneralErrorService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): RoleCollection|JsonResponse
    {
        try {

            return new RoleCollection($this->roleModel->all());

        } catch (\Throwable|\Exception $e) {

            return $this->handleGeneralErrorService->log($e);
        }

    }
}

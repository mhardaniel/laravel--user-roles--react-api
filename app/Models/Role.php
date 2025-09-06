<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    protected $fillable = ['name'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function getRoleByName(string $roleName): Role
    {
        return $this->query()->where('name', $roleName)->first();
    }

    public function getRoleIds(array $roles): array
    {
        return $this->query()->whereIn('name', $roles)->pluck('id')->toArray();
    }
}

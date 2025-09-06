<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;

class HandleGeneralErrorService
{
    protected $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function log(\Throwable|\Exception $error): JsonResponse
    {

        $this->logger->error($error);

        return response()->json([
            'success' => false,
            'message' => 'Internal Server Error',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);

    }
}

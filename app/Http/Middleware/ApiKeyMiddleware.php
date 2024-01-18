<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);                 // Avoid return and take it to last line when frontend will implement the api key

        $apiKey = getenv('API_KEY');
        // Returns boolean
        if ($request->headers->has('API-KEY') == false) {
            return response()->json([
                'status' => false,
                'message' => 'No Authorization Key',
            ], 401);
        };
        // Returns header value with default as fallback
        $val = $request->header('API-KEY', 'default_value');
        if ($val === $apiKey) {
            return $next($request);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid API Key',
            ], 401);
        }
    }
}

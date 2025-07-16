<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('user-profiles', UserProfileController::class);


Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('angular_token')->plainTextToken;

    return response()->json([
        'user'  => $user,
        'token' => $token,
    ]);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid email or password.'], 401);
    }

    $token = $user->createToken('angular_token')->plainTextToken;

    return response()->json([
        'user'  => $user,
        'token' => $token,
    ]);

    \Log::info('Trying to login: ' . $request->email);
    \Log::info('Password match: ' . (Hash::check($request->password, $user->password) ? 'yes' : 'no'));

});

// 🔒 Protected routes using token
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/attendance', function (Request $request) {
        return [
            'status' => 'success',
            'user'   => $request->user()
        ];
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    });
});
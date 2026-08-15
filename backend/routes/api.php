<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\QuoteRequestController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SettingController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

// ---- Public ----
Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{product}", [ProductController::class, "show"]);
Route::post("/devis", [QuoteRequestController::class, "store"]);
Route::get("/avis", [ReviewController::class, "index"]);
Route::post("/avis", [ReviewController::class, "store"]);
Route::post("/admin/login", [AuthController::class, "login"]);
Route::get("/categories", function () {
    return Category::all();
});
Route::get("/settings", [SettingController::class, "show"]);
Route::post("/chat", [ChatController::class, "chat"]);

// ---- Admin (protege par Sanctum) ----
Route::middleware("auth:sanctum")->prefix("admin")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::post("/products", [ProductController::class, "store"]);
    Route::put("/products/{product}", [ProductController::class, "update"]);
    Route::delete("/products/{product}", [ProductController::class, "destroy"]);
    Route::put("/products/{product}/toggle-nouveau", [ProductController::class, "toggleNouveau"]);
    Route::get("/devis", [QuoteRequestController::class, "index"]);
    Route::put("/devis/{quoteRequest}", [QuoteRequestController::class, "update"]);
    Route::get("/avis", [ReviewController::class, "indexAdmin"]);
    Route::put("/avis/{review}/approve", [ReviewController::class, "approve"]);
    Route::delete("/avis/{review}", [ReviewController::class, "destroy"]);
    Route::get("/settings", [SettingController::class, "show"]);
    Route::put("/settings", [SettingController::class, "update"]);
});


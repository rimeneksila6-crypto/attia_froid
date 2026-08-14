<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function show()
    {
        $settings = Setting::first();

        if (!$settings) {
            $settings = Setting::create([
                "phone" => "55 836 100",
                "email" => "attia_froid@hotmail.com",
                "address" => "Av Ali Belhouane, Kelibia, Tunisie",
                "hours_week" => "08:00 - 18:00",
                "hours_sat" => "08:00 - 13:00",
                "hours_sun" => "Ferme",
                "instagram" => "instagram.com/froidattia",
            ]);
        }

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            "phone" => "nullable|string|max:50",
            "email" => "nullable|email|max:255",
            "address" => "nullable|string|max:255",
            "hours_week" => "nullable|string|max:50",
            "hours_sat" => "nullable|string|max:50",
            "hours_sun" => "nullable|string|max:50",
            "instagram" => "nullable|string|max:255",
        ]);

        $settings = Setting::first();

        if (!$settings) {
            $settings = Setting::create($validated);
        } else {
            $settings->update($validated);
        }

        return response()->json($settings);
    }
}

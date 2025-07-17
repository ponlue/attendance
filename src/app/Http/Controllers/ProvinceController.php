<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProvinceController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Province::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:provinces,code',
            'name' => 'required|string|max:255',
        ]);

        return Province::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Province::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $province = Province::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|unique:provinces,code,' . $id,
            'name' => 'required|string|max:255',
        ]);

        $province->update($validated);

        return $province;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $province = Province::findOrFail($id);
        $province->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

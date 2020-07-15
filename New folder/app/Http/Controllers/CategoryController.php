<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
       $categories=Category::all();
       return response()->json($categories);
    }
    public function create()
    {
        return view('frontend.category.create');
    }

    public function store(Request $request)
    {
      $categories=Category::create($request->all());
      return response()->json($categories);
    }
    

    public function edit($id)
    {
        $categories = Category::find($id);
         return response()->json($categories);
    }
    
    public function show($id)
    {
        $categories=Category::all();
        return response()->json($categories);
     }

    public function update(Request $request, $id)
    {
       $categories = Category::find($id)->update($request->all());
        return response()->json($categories);
    }
        public function destroy($id)
        {
        $categories = Category::find($id)->delete();
        return response()->json($categories);
    }
}

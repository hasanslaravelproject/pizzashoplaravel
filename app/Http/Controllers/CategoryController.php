<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;  
use Illuminate\Support\Str;
use Image;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  Category::get(); 
    }

     
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
        $fileName = $this->uploadPhoto($request);
        $request->validate([
            'name' => 'required',
            
        ]);
   
        $category = new Category();
        $category->name = $request->name;
     
        $category->image = $fileName;
        $category->save();

        return response()->json(['success','category created successfully.']);
    }
    public function uploadPhoto($request)
    { 
          $file = $request->image;
            $count = strlen($file);
            if ($count <= 5000) {
                return ['errors' => 'Please Select An Image and must Jpeg,jpg,png'];
            } else {
                $explode_file = explode(',', $file);
                $decode = base64_decode($explode_file[1]);
                if (Str::contains($explode_file[0], 'jpeg')) {
                    $extension = 'jpg';
                } else {
                    $extension = 'png';
                } 
                $fileName = 'category' . Str::random() . '.' . $extension;
                $images = Image::make($decode);  
                $images->save('uploads/' . $fileName); 
                return   $fileName;
            } 
    }

    /**
     * view all category
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Category::where('id', $id)->first();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(category $category)
    {
        return response()->json(['category', $category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
  $fileName = $this->UpdateAvater($request, $id);
        $request->validate([
            'name' => 'required',
          
        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->name;

        $category->image = $fileName;
        $category->save();

        return response()->json(['success','category Updated successfully.']);
    }

    public function UpdateAvater($request, $id)
    {
        $admin = Category::where('id', $id)->first();
        if ($admin->id == $id) {
        $file = $request->image;
         if($file){
            $count = strlen($file);
            if ($count <= 5000) {
                return ['errors' => 'Please Select An Image and must Jpeg,jpg,png'];
            } else {
                $explode_file = explode(',', $file);
                $decode = base64_decode($explode_file[1]);
                if (Str::contains($explode_file[0], 'jpeg')) {
                    $extension = 'jpg';
                } else {
                    $extension = 'png';
                }
              
                    $fileName = 'photo' . Str::random() . '.' . $extension;
                    $images = Image::make($decode); 
                    $storage_path = 'uploads/' . $admin->image;
                    if (\File::exists($storage_path)) {
                        unlink($storage_path);
                    } 
                    $images->save('uploads/' . $fileName);
                }
                return  $fileName;
                }else{
                    return $fileName = $admin->image;
                }
            }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    { 
         $storage_path = 'uploads/' . $category->image;
            if (\File::exists($storage_path)) {
                unlink($storage_path);
            }  
        $category->delete();
        return response()->json(['success','category Deleted successfully.']);
    }
}
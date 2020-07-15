<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;  
use Illuminate\Support\Str;
use Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
       // return  Product::get(); 
       // https://laravel.com/docs/7.x/pagination
       // ->paginate(10);
        return  Product::paginate(4); 
    }

    public function getProductsWrtCategory($id)
    {
        if($id!='All') {
            return  Product::where('category_id', '=', $id)->paginate(4); 
        } else {
            return  Product::paginate(4);
        }
        
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
            'description' => 'required',
            'price' => 'required',
            'unit' => 'required',
            'quantity' => 'required', 
        ]);
   
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description; 
        $product->price = $request->price;
        $product->unit = $request->unit;
        $product->quantity = $request->quantity;
        $product->image = $fileName;
        $product->category_id = $request->category_id;
        $product->category_name = $request->category_name;
        $product->save();

        return response()->json(['success','Product created successfully.']);
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
                $fileName = 'product' . Str::random() . '.' . $extension;
                $images = Image::make($decode);  
                $images->save('uploads/' . $fileName); 
                return   $fileName;
            } 
    }

    /**
     * view all product
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::where('id', $id)->first();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return response()->json(['product', $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
  $fileName = $this->UpdateAvater($request, $id);
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'unit' => 'required',
            'quantity' => 'required', 
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->description = $request->description; 
        $product->price = $request->price;
        $product->unit = $request->unit;
        $product->quantity = $request->quantity;
        $product->image = $fileName;
        
        $product->category_id = $request->category_id;
        $product->category_name = $request->category_name;
        $product->save();

        return response()->json(['success','Product Updated successfully.']);
    }

    public function UpdateAvater($request, $id)
    {
        $admin = Product::where('id', $id)->first();
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
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    { 
         $storage_path = 'uploads/' . $product->image;
            if (\File::exists($storage_path)) {
                unlink($storage_path);
            }  
        $product->delete();
        return response()->json(['success','Product Deleted successfully.']);
    }
}

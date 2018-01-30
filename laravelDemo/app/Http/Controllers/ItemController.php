<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        $item = new Item([
          'name' => $request->get('name'),
          'price' => $request->get('price')
        ]);
        $item->save();
        return response()->json('Successfully added');
    }

    public function getItems(){
    	$items = Item::latest()->get();
    	return response()->json(compact('items'));
    }

    public function delete($id){
        $item = Item::find($id);
        $item->delete();
        return response()->json('Deleted Successfully.');
    }
}

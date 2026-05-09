<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventFaqCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventFaqCategoryController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventFaqCategories = EventFaqCategory::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query->whereLike('name', "%$value%");
                })
                //
                ->when($request->boolean('with_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->withTrashed();
                })
                //
                ->when($request->boolean('only_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->onlyTrashed();
                })
                //
                ->get();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaqCategories' => $eventFaqCategories,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventFaqCategory = EventFaqCategory::withTrashed()->find($id);
            //
            if (!$eventFaqCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaqCategory' => $eventFaqCategory,
                ],
            ]);
            //
        });
    }

    public function store(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'name' => [
                    'required',
                    'string',
                    'unique:event_faq_categories,name',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventFaqCategory = new EventFaqCategory();
            $eventFaqCategory->slug = $slug;
            $eventFaqCategory->name = $request->input('name');
            $eventFaqCategory->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaqCategory' => $eventFaqCategory,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'name' => [
                    'nullable',
                    'string',
                    Rule::unique('event_faq_categories')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventFaqCategory = EventFaqCategory::withTrashed()->find($id);
            //
            if (!$eventFaqCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventFaqCategory->name = $request->input('name');
            }
            //
            if ($eventFaqCategory->isDirty()) {
                $eventFaqCategory->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventFaqCategory->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaqCategory' => $eventFaqCategory,
                ],
            ]);
        });
    }

    public function destroy(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'force_delete' => ['nullable', 'boolean'],
            ]);
            //
            $eventFaqCategory = EventFaqCategory::withTrashed()->find($id);
            //
            if (!$eventFaqCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventFaqCategory->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventFaqCategory->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

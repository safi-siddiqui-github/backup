<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventCategoryController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventCategories = EventCategory::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query->whereLike('name', "%$value%");
                })
                //
                ->when($request->integer('parent_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('parent_id', $value);
                })
                //
                ->when($request->boolean('only_parent'), function (
                    $query,
                    $value,
                ) {
                    $query->whereNull('parent_id');
                })
                //
                ->when($request->boolean('only_child'), function (
                    $query,
                    $value,
                ) {
                    $query->whereNotNull('parent_id');
                })
                //
                ->when($request->boolean('only_public'), function (
                    $query,
                    $value,
                ) {
                    $query->where('is_private', false);
                })
                //
                ->when($request->boolean('only_private'), function (
                    $query,
                    $value,
                ) {
                    $query->where('is_private', true);
                })
                //
                ->when(
                    $request->boolean('with_event_sub_categories'),
                    function ($query, $value) {
                        $query->with('eventSubCategories');
                    },
                )
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
                    'eventCategories' => $eventCategories,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventCategory = EventCategory::withTrashed()->find($id);
            //
            if (!$eventCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_sub_categories')) {
                $eventCategory->load('eventSubCategories');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventCategory' => $eventCategory,
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
                'parent_id' => [
                    'nullable',
                    'integer',
                    'exists:event_categories,id',
                ],
                'name' => [
                    'required',
                    'string',
                    'unique:event_categories,name',
                ],
                'description' => ['nullable', 'string'],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventCategory = new EventCategory();
            $eventCategory->slug = $slug;
            $eventCategory->parent_id = $request->input('parent_id');
            $eventCategory->name = $request->input('name');
            $eventCategory->description = $request->input('description');
            $eventCategory->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventCategory' => $eventCategory,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'parent_id' => [
                    'nullable',
                    'integer',
                    'exists:event_categories,id',
                    Rule::notIn($id),
                ],
                'name' => [
                    'nullable',
                    'string',
                    Rule::unique('event_categories')->ignore($id),
                ],
                'description' => ['nullable', 'string'],
                'is_private' => ['nullable', 'boolean'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventCategory = EventCategory::withTrashed()->find($id);
            //
            if (!$eventCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventCategory->name = $request->input('name');
            }
            //
            if ($request->has('parent_id')) {
                $eventCategory->parent_id = $request->input('parent_id');
            }
            //
            if ($request->has('description')) {
                $eventCategory->description = $request->input('description');
            }
            //
            if ($request->has('is_private')) {
                $eventCategory->is_private = $request->boolean('is_private');
            }
            //
            if ($eventCategory->isDirty()) {
                $eventCategory->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventCategory->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventCategory' => $eventCategory,
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
            $eventCategory = EventCategory::withTrashed()->find($id);
            //
            if (!$eventCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventCategory->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventCategory->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

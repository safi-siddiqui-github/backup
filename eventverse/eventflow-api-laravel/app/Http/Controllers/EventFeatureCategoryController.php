<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventFeatureCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventFeatureCategoryController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventFeatureCategories = EventFeatureCategory::query()
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
                ->when(
                    $request->boolean('with_event_feature_sub_categories'),
                    function ($query, $value) {
                        $query->with('eventFeatureSubCategories');
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
                    'eventFeatureCategories' => $eventFeatureCategories,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventFeatureCategory = EventFeatureCategory::withTrashed()->find(
                $id,
            );
            //
            if (!$eventFeatureCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_feature_sub_categories')) {
                $eventFeatureCategory->load('eventFeatureSubCategories');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeatureCategory' => $eventFeatureCategory,
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
                    'exists:event_feature_categories,id',
                ],
                'name' => [
                    'required',
                    'string',
                    'unique:event_feature_categories,name',
                ],
                'description' => ['nullable', 'string'],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventFeatureCategory = new EventFeatureCategory();
            $eventFeatureCategory->slug = $slug;
            $eventFeatureCategory->parent_id = $request->input('parent_id');
            $eventFeatureCategory->name = $request->input('name');
            $eventFeatureCategory->description = $request->input('description');
            $eventFeatureCategory->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeatureCategory' => $eventFeatureCategory,
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
                    'exists:event_feature_categories,id',
                    Rule::notIn($id),
                ],
                'name' => [
                    'nullable',
                    'string',
                    Rule::unique('event_feature_categories')->ignore($id),
                ],
                'description' => ['nullable', 'string'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventFeatureCategory = EventFeatureCategory::withTrashed()->find(
                $id,
            );
            //
            if (!$eventFeatureCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventFeatureCategory->name = $request->input('name');
            }
            //
            if ($request->has('parent_id')) {
                $eventFeatureCategory->parent_id = $request->input('parent_id');
            }
            //
            if ($request->has('description')) {
                $eventFeatureCategory->description = $request->input(
                    'description',
                );
            }
            //
            if ($eventFeatureCategory->isDirty()) {
                $eventFeatureCategory->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventFeatureCategory->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeatureCategory' => $eventFeatureCategory,
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
            $eventFeatureCategory = EventFeatureCategory::withTrashed()->find(
                $id,
            );
            //
            if (!$eventFeatureCategory) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventFeatureCategory->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventFeatureCategory->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventColor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventColorController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventColors = EventColor::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWhereLike('code', "%$value%");
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
                    'eventColors' => $eventColors,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventColor = EventColor::withTrashed()->find($id);
            //
            if (!$eventColor) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventColor' => $eventColor,
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
                'name' => ['required', 'string', 'unique:event_colors,name'],
                'code' => [
                    'required',
                    'string',
                    'size:7',
                    'starts_with:#',
                    'unique:event_colors,code',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventColor = new EventColor();
            $eventColor->slug = $slug;
            $eventColor->name = $request->input('name');
            $eventColor->code = $request->input('code');
            $eventColor->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventColor' => $eventColor,
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
                    Rule::unique('event_colors')->ignore($id),
                ],
                'code' => [
                    'nullable',
                    'string',
                    'size:7',
                    'starts_with:#',
                    Rule::unique('event_colors')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventColor = EventColor::withTrashed()->find($id);
            //
            if (!$eventColor) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed null
            if ($request->input('name')) {
                $eventColor->name = $request->input('name');
            }
            //
            // Not allowed null
            if ($request->input('code')) {
                $eventColor->code = $request->input('code');
            }
            //
            if ($eventColor->isDirty()) {
                $eventColor->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventColor->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventColor' => $eventColor,
                ],
            ]);
        });
    }

    public function destroy(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventColor = EventColor::withTrashed()->find($id);
            //
            if (!$eventColor) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventColor->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventColor->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

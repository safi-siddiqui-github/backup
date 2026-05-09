<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventLaunchStrategy;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventLaunchStrategyController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventLaunchStrategies = EventLaunchStrategy::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWereLike('option_one', "%$value%")
                        ->orWereLike('option_two', "%$value%")
                        ->orWereLike('option_three', "%$value%");
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
                    'eventLaunchStrategies' => $eventLaunchStrategies,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventLaunchStrategy = EventLaunchStrategy::withTrashed()->find(
                $id,
            );
            //
            if (!$eventLaunchStrategy) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventLaunchStrategy' => $eventLaunchStrategy,
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
                    'unique:event_launch_strategies,name',
                ],
                'description' => ['nullable', 'string'],
                'option_one' => ['nullable', 'string'],
                'option_two' => ['nullable', 'string'],
                'option_three' => ['nullable', 'string'],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventLaunchStrategy = new EventLaunchStrategy();
            $eventLaunchStrategy->slug = $slug;
            $eventLaunchStrategy->name = $request->input('name');
            $eventLaunchStrategy->description = $request->input('description');
            $eventLaunchStrategy->option_one = $request->input('option_one');
            $eventLaunchStrategy->option_two = $request->input('option_two');
            $eventLaunchStrategy->option_three = $request->input(
                'option_three',
            );
            $eventLaunchStrategy->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventLaunchStrategy' => $eventLaunchStrategy,
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
                    Rule::unique('event_launch_strategies')->ignore($id),
                ],
                'description' => ['nullable', 'string'],
                'option_one' => ['nullable', 'string'],
                'option_two' => ['nullable', 'string'],
                'option_three' => ['nullable', 'string'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventLaunchStrategy = EventLaunchStrategy::withTrashed()->find(
                $id,
            );
            //
            if (!$eventLaunchStrategy) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Should not be null
            if ($request->input('name')) {
                $eventLaunchStrategy->name = $request->input('name');
            }
            //
            if ($request->has('description')) {
                $eventLaunchStrategy->description = $request->input(
                    'description',
                );
            }
            //
            if ($request->has('option_one')) {
                $eventLaunchStrategy->option_one = $request->input(
                    'option_one',
                );
            }
            //
            if ($request->has('option_two')) {
                $eventLaunchStrategy->option_two = $request->input(
                    'option_two',
                );
            }
            //
            if ($request->has('option_three')) {
                $eventLaunchStrategy->option_three = $request->input(
                    'option_three',
                );
            }
            //
            if ($eventLaunchStrategy->isDirty()) {
                $eventLaunchStrategy->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventLaunchStrategy->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventLaunchStrategy' => $eventLaunchStrategy,
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
            $eventLaunchStrategy = EventLaunchStrategy::withTrashed()->find(
                $id,
            );
            //
            if (!$eventLaunchStrategy) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventLaunchStrategy->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventLaunchStrategy->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

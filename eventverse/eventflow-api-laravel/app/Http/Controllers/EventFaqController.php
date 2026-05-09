<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventFaq;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventFaqController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventFaqs = EventFaq::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('question', "%$value%")
                        ->orWhereLike('answer', "%$value%")
                        ->orWhereLike('slug', "%$value%");
                })
                //
                ->when($request->integer('event_faq_category_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_faq_category_id', $value);
                })
                //
                ->when($request->boolean('with_event_faq_category'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventFaqCategory');
                })
                //
                ->when($request->integer('event_model_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_model_id', $value);
                })
                //
                ->when($request->boolean('with_event_model'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventModel');
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
                    'eventFaqs' => $eventFaqs,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventFaq = EventFaq::withTrashed()->find($id);
            //
            if (!$eventFaq) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_faq_category')) {
                $eventFaq->load('eventFaqCategory');
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventFaq->load('eventModel');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaq' => $eventFaq,
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
                'event_model_id' => [
                    'required',
                    'integer',
                    'exists:event_models,id',
                ],
                'event_faq_category_id' => [
                    'required',
                    'integer',
                    'exists:event_faq_categories,id',
                ],
                'question' => ['required', 'string'],
                'answer' => ['required', 'string'],
            ]);
            //
            $slug = 'event-faq-' . $this->uuidHelper();
            //
            $eventFaq = new EventFaq();
            $eventFaq->slug = $slug;
            $eventFaq->event_model_id = $request->input('event_model_id');
            $eventFaq->event_faq_category_id = $request->input(
                'event_faq_category_id',
            );
            $eventFaq->question = $request->input('question');
            $eventFaq->answer = $request->input('answer');
            $eventFaq->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaq' => $eventFaq,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'event_faq_category_id' => [
                    'nullable',
                    'integer',
                    'exists:event_faq_categories,id',
                ],
                'question' => ['nullable', 'string'],
                'answer' => ['nullable', 'string'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventFaq = EventFaq::withTrashed()->find($id);
            //
            if (!$eventFaq) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('question')) {
                $eventFaq->question = $request->input('question');
            }
            //
            if ($request->has('event_faq_category_id')) {
                $eventFaq->event_faq_category_id = $request->input(
                    'event_faq_category_id',
                );
            }
            //
            if ($request->has('answer')) {
                $eventFaq->answer = $request->input('answer');
            }
            //
            if ($eventFaq->isDirty()) {
                $eventFaq->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventFaq->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFaq' => $eventFaq,
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
            $eventFaq = EventFaq::withTrashed()->find($id);
            //
            if (!$eventFaq) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventFaq->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventFaq->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CRMController extends Controller
{
    public function home()
    {
        return Inertia::render('crm/pages/Home');
    }
    public function dashboard()
    {
        return Inertia::render('dashboard');
    }
}

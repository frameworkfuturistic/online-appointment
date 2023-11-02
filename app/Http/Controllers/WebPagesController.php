<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebPagesController extends Controller
{
    //
    public function aboutUs()
    {
        return view('web-pages/about-us');
    }

    //
    public function mission()
    {
        return view('web-pages/mission');
    }

    //
    public function values()
    {
        return view('web-pages/values');
    }

    //
    public function policy()
    {
        return view('web-pages/policy');
    }


    //
    public function gallery()
    {
        return view('web-pages/gallery');
    }

    //
    public function facility()
    {
        return view('web-pages/facility');
    }


    //
    public function speciality()
    {
        return view('web-pages/speciality');
    }

    //
    public function scedule()
    {
        return view('web-pages/scedule');
    }

    //
    public function career()
    {
        return view('web-pages/career');
    }

    //
    public function contactus()
    {
        return view('web-pages/contactus');
    }
}

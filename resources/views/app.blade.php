<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="supernova">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Online Appointment</title>
    <!-- Fonts -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="alternate" type="application/json+oembed" href="https://www.jotform.com/oembed/?format=json&amp;url=https%3A%2F%2Fform.jotform.com%2F232980825800458" title="oEmbed Form">
    <link rel="alternate" type="text/xml+oembed" href="https://www.jotform.com/oembed/?format=xml&amp;url=https%3A%2F%2Fform.jotform.com%2F232980825800458" title="oEmbed Form">
    <meta property="og:title" content="Online Doctor Appointment Form">
    <meta property="og:url" content="https://form.jotform.com/232980825800458">
    <meta property="og:description" content="Please click the link to complete this form.">
    <meta name="slack-app-id" content="AHNMASS8M">
    <meta property="og:image" content="https://cdn.jotfor.ms/assets/img/landing/opengraph.png" />
    <link rel="shortcut icon" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="canonical" href="https://form.jotform.com/232980825800458" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=1" />
    <meta name="HandheldFriendly" content="true" />
    <title>Online Doctor Appointment Form</title>
    <link type="text/css" rel="stylesheet" href="https://cdn01.jotfor.ms/themes/CSS/form-common.css?v=3ee1a96" />

    <!-- Bootstrap  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style type="text/css">
        @media print {
            .form-section {
                display: inline !important
            }

            .form-pagebreak {
                display: none !important
            }

            .form-section-closed {
                height: auto !important
            }

            .page-section {
                position: initial !important
            }
        }
    </style>
    <link type="text/css" rel="stylesheet" href="https://cdn02.jotfor.ms/themes/CSS/5e6b428acc8c4e222d1beb91.css?v=3.3.46852&themeRevisionID=63763808623532087895e4de" />

    <style type="text/css" id="form-designer-style">
        /* Injected CSS Code */
        /*PREFERENCES STYLE*/
        .form-all {
            font-family: Inter, sans-serif;
        }

        .form-all .qq-upload-button,
        .form-all .form-submit-button,
        .form-all .form-submit-reset,
        .form-all .form-submit-print {
            font-family: Inter, sans-serif;
        }

        .form-all .form-pagebreak-back-container,
        .form-all .form-pagebreak-next-container {
            font-family: Inter, sans-serif;
        }

        .form-header-group {
            font-family: Inter, sans-serif;
        }

        .form-label {
            font-family: Inter, sans-serif;
        }

        .form-label.form-label-auto {

            display: block;
            float: none;
            text-align: left;
            width: 100%;

        }

        .form-line {
            margin-top: 12px 36px 12px 36px px;
            margin-bottom: 12px 36px 12px 36px px;
        }

        .form-all {
            max-width: 752px;
            width: 100%;
        }

        .form-label.form-label-left,
        .form-label.form-label-right,
        .form-label.form-label-left.form-label-auto,
        .form-label.form-label-right.form-label-auto {
            width: 230px;
        }

        .form-all {
            font-size: 16px
        }

        .form-all .qq-upload-button,
        .form-all .qq-upload-button,
        .form-all .form-submit-button,
        .form-all .form-submit-reset,
        .form-all .form-submit-print {
            font-size: 16px
        }

        .form-all .form-pagebreak-back-container,
        .form-all .form-pagebreak-next-container {
            font-size: 16px
        }

        .supernova .form-all,
        .form-all {
            background-color: #fff;
        }

        .form-all {
            color: #000000;
        }

        .form-header-group .form-header {
            color: #000000;
        }

        .form-header-group .form-subHeader {
            color: #000000;
        }

        .form-label-top,
        .form-label-left,
        .form-label-right,
        .form-html,
        .form-checkbox-item label,
        .form-radio-item label,
        span.FITB .qb-checkbox-label,
        span.FITB .qb-radiobox-label,
        span.FITB .form-radio label,
        span.FITB .form-checkbox label,
        [data-blotid][data-type=checkbox] [data-labelid],
        [data-blotid][data-type=radiobox] [data-labelid],
        span.FITB-inptCont[data-type=checkbox] label,
        span.FITB-inptCont[data-type=radiobox] label {
            color: #000000;
        }

        .form-sub-label {
            color: #1a1a1a;
        }

        .supernova {
            background-color: #ecedf3;
        }

        .supernova body {
            background: transparent;
        }

        .form-textbox,
        .form-textarea,
        .form-dropdown,
        .form-radio-other-input,
        .form-checkbox-other-input,
        .form-captcha input,
        .form-spinner input {
            background-color: #fff;
        }

        .supernova {
            background-image: none;
        }

        #stage {
            background-image: none;
        }

        .form-all {
            background-image: none;
        }

        .ie-8 .form-all:before {
            display: none;
        }

        .ie-8 {
            margin-top: auto;
            margin-top: initial;
        }

        /*PREFERENCES STYLE*/
        /*__INSPECT_SEPERATOR__*/
        .supernova {
            background-image: linear-gradient(#f5f9f9, #87e3da);
            background-attachment: fixed;
        }

        .form-all {
            box-shadow: 0 0 32px rgba(42, 42, 42, 0.16);
        }

        .form-all,
        #stage .formPage-stage.form-all,
        .form-section.page-section {
            border-radius: 6px;
        }

        .form-header-group.header-large {
            padding: 24px 48px !important;
            border-top: 1px solid #E0E0E0;
            border-bottom: 0px solid #EEE;
            margin-top: 12px;
        }

        /* Injected CSS Code */
    </style>

</head>

<body class="antialiased">
    @inertia

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>
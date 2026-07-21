<?php

if (!defined('ABSPATH')) {
    exit;
}

function caisse_mobile_enqueue_assets(): void
{
    $theme_uri = get_template_directory_uri();
    $theme_path = get_template_directory();

    wp_enqueue_style(
        'caisse-mobile-app',
        $theme_uri . '/assets/css/app.css',
        [],
        filemtime($theme_path . '/assets/css/app.css')
    );

    wp_enqueue_style(
        'caisse-mobile-modal',
        $theme_uri . '/assets/css/modal.css',
        ['caisse-mobile-app'],
        filemtime($theme_path . '/assets/css/modal.css')
    );

    wp_enqueue_script(
        'caisse-mobile-products',
        $theme_uri . '/assets/js/products.js',
        [],
        filemtime($theme_path . '/assets/js/products.js'),
        true
    );

    wp_enqueue_script(
        'caisse-mobile-storage',
        $theme_uri . '/assets/js/storage.js',
        [],
        filemtime($theme_path . '/assets/js/storage.js'),
        true
    );

    wp_enqueue_script(
        'caisse-mobile-vente',
        $theme_uri . '/assets/js/vente.js',
        ['caisse-mobile-products'],
        filemtime($theme_path . '/assets/js/vente.js'),
        true
    );

    wp_enqueue_script(
        'caisse-mobile-encaissement',
        $theme_uri . '/assets/js/encaissement.js',
        ['caisse-mobile-storage', 'caisse-mobile-vente'],
        filemtime($theme_path . '/assets/js/encaissement.js'),
        true
    );


    wp_enqueue_script(
        'caisse-mobile-recap',
        $theme_uri . '/assets/js/recap.js',
        ['caisse-mobile-storage', 'caisse-mobile-vente'],
        filemtime($theme_path . '/assets/js/recap.js'),
        true
    );

    wp_enqueue_script(
        'caisse-mobile-app',
        $theme_uri . '/assets/js/app.js',
        ['caisse-mobile-vente', 'caisse-mobile-encaissement', 'caisse-mobile-recap'],
        filemtime($theme_path . '/assets/js/app.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'caisse_mobile_enqueue_assets');

function caisse_mobile_theme_setup(): void
{
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'caisse_mobile_theme_setup');

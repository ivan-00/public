<?php

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover">

    <?php wp_head(); ?>
</head>

<body <?php body_class('caisse-mobile-body'); ?>>
    <?php wp_body_open(); ?>

    <main id="caisse-app">
        <?php get_template_part('templates/vente'); ?>
        <?php get_template_part('templates/historypage'); ?>
        <?php get_template_part('templates/encaissement'); ?>
        <?php get_template_part('templates/modal-rendu'); ?>
        <?php get_template_part('templates/recap'); ?>
    </main>

    <?php wp_footer(); ?>
</body>

</html>
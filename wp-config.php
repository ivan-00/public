<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'FG,POEoK9c5qwcQ$RsG`5Q%pQi`I,-c<bIqY*;hVWcFtU`%jlzP.7s^Imb+;Id3A' );
define( 'SECURE_AUTH_KEY',   'aYFhi70PJCAoV`8Nkr+6?P.8m@iK$E)L^2Cl.&-@WceJi7bvmo*q==kpz[c*WY-a' );
define( 'LOGGED_IN_KEY',     '8W$F|$Be1slx}>{*2K^t!6qPHp+*6WmR|Ff/4VW9(+zh>Y`b;;ML:0!^4aw0Kb]^' );
define( 'NONCE_KEY',         'cP$X.4p9-/FSoRR,<k{r!og}kSCtAM:y+3_ieqc)^r/+iai}M?cJyt)4BmXlI@Gh' );
define( 'AUTH_SALT',         '(<]@+n<. #|]iPY]$#D/8K38/N4&nA[q_:+[i=w<R:(Gz9SI!G>N2{DJV6+xN-B*' );
define( 'SECURE_AUTH_SALT',  '6CYr`hZ/wjscdsM ]LUSeL$SaR`mSef9;S}.fOO+g~M0%cvgmhKcXmag5>Xw70]k' );
define( 'LOGGED_IN_SALT',    'e,1.#GB+JU2PZ`L0DB:.naENhT0X)LO16o+G[}iBje+0eiFk#A85.WbFY7I.4=fI' );
define( 'NONCE_SALT',        'x_E,im]sE<Qm!:NwsAv@iK3g}($dN!uIHz^.``XW7i}LVuH>e{X6wPo#88ZR9Q]h' );
define( 'WP_CACHE_KEY_SALT', 'i 2MZp@78=W$vF)k=O,Rq^H-ob$1NT+[35458R^-?rh/O]xpK:I<*lE~M16hry)z' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

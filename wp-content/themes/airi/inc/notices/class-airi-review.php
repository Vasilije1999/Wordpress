<?php
/**
 * Airi review notice
 *
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Class to display the theme review notice after certain period.
 *
  */
class Airi_Theme_Review_Notice {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'review_notice' ) );
		add_action( 'admin_notices', array( $this, 'review_notice_markup' ), 0 );
		add_action( 'admin_init', array( $this, 'ignore_theme_review_notice' ), 0 );
		add_action( 'admin_init', array( $this, 'ignore_theme_review_notice_partially' ), 0 );
		add_action( 'switch_theme', array( $this, 'review_notice_data_remove' ) );
	}

	/**
	 * Set the required option value as needed for theme review notice.
	 */
	public function review_notice() {
		if ( !get_option( 'airi_theme_installed_time' ) ) {
			update_option( 'airi_theme_installed_time', time() );
		}
	}

	/**
	 * Show HTML markup if conditions met.
	 */
	public function review_notice_markup() {
		$user_id                  = get_current_user_id();
		$current_user             = wp_get_current_user();
		$ignored_notice           = get_user_meta( $user_id, 'airi_disable_retirement_notice', true );
		$ignored_notice_partially = get_user_meta( $user_id, 'delay_airi_disable_retirement_notice_partially', true );

		if ( $ignored_notice ) {
			return;
		}
		?>
		<div class="notice notice-success" style="position:relative;">
			<p><?php echo __( '<strong>Important</strong>: We would like to let you know that we plan to remove this theme from WordPress.org around December 1st. This is because we are now focussing all of our efforts on our two flagship themes, <a target="_blank" href="https://athemes.com/theme/sydney/">Sydney</a> and <a target="_blank" href="https://athemes.com/theme/botiga/">Botiga</a>.', 'airi'); ?></p>
			<p><?php echo __( 'While you can continue using this theme for as long as you want, you should be aware that we will no longer be updating it, and therefore we strongly recommend that you switch to <a target="_blank" href="https://athemes.com/theme/sydney/">Sydney</a> or <a target="_blank" href="https://athemes.com/theme/botiga/">Botiga</a> going forward (or another theme of your choice).', 'airi' ); ?></p>
			<p><?php echo __( 'We thank you for using the theme and hope you will continue your journey with WordPress with us.', 'airi' ); ?></p>
			<a class="notice-dismiss" href="?nag_airi_disable_retirement_notice=0" style="text-decoration:none;"></a>
		</div>
		<?php
	}

	/**
	 * Disable review notice permanently
	 */
	public function ignore_theme_review_notice() {
		if ( isset( $_GET['nag_airi_disable_retirement_notice'] ) && '0' == $_GET['nag_airi_disable_retirement_notice'] ) {
			add_user_meta( get_current_user_id(), 'airi_disable_retirement_notice', 'true', true );
		}
	}

	/**
	 * Delay review notice
	 */
	public function ignore_theme_review_notice_partially() {
		if ( isset( $_GET['delay_airi_disable_retirement_notice_partially'] ) && '0' == $_GET['delay_airi_disable_retirement_notice_partially'] ) {
			update_user_meta( get_current_user_id(), 'delay_airi_disable_retirement_notice_partially', time() );
		}
	}

	/**
	 * Delete data on theme switch
	 */
	public function review_notice_data_remove() {
		$get_all_users        = get_users();
		$theme_installed_time = get_option( 'airi_theme_installed_time' );

		// Delete options data.
		if ( $theme_installed_time ) {
			delete_option( 'airi_theme_installed_time' );
		}

		foreach ( $get_all_users as $user ) {
			$ignored_notice           = get_user_meta( $user->ID, 'airi_disable_retirement_notice', true );
			$ignored_notice_partially = get_user_meta( $user->ID, 'delay_airi_disable_retirement_notice_partially', true );

			if ( $ignored_notice ) {
				delete_user_meta( $user->ID, 'airi_disable_retirement_notice' );
			}

			if ( $ignored_notice_partially ) {
				delete_user_meta( $user->ID, 'delay_airi_disable_retirement_notice_partially' );
			}
		}
	}
}

new Airi_Theme_Review_Notice();

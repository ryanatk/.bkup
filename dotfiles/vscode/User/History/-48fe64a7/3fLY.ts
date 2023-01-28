// DO NOT EDIT!!! This file is auto-generated.

export const LOCALES_SUPPORTED = ['de', 'en', 'fi', 'eu', 'us'] as const;
export const LOCALE_DEFAULT: LocaleSupported = 'en';

export async function getMessagesForLocale(
  locale: LocaleSupported = LOCALE_DEFAULT,
) {
  switch (locale) {
    case 'de':
      return import('./locale/de.json');
    case 'en':
      return import('./locale/en.json');
    case 'fi':
      return import('./locale/fi.json');
    case 'eu':
      return import('./locale/en.json');
    case 'us':
      return import('./locale/en.json');
    default:
      throw new Error('Language not supported');
  }
}

export type LocaleSupported = typeof LOCALES_SUPPORTED[number];

export type MessageKey =
  | '247_heart_rate'
  | '247_heart_rate_body'
  | '360_view_of_health'
  | '404_back_to_home'
  | '404_buytheouraring'
  | '404_caption'
  | '404_oura_home'
  | '404_pulse'
  | '404_returnhome'
  | '404_subtitle'
  | '404_title'
  | '5-days-for-training'
  | 'accept_cookies'
  | 'accolades_cb_insights'
  | 'accolades_fast_company'
  | 'accolades_nyt'
  | 'accolades_real_simple'
  | 'accolades_techcrunch'
  | 'accolades_theverge'
  | 'accolades_time'
  | 'accolades_vogue'
  | 'accolades_wirecutter'
  | 'accolades_wired'
  | 'activity_levels'
  | 'activity_levels_body'
  | 'address_modal_description'
  | 'address_suggestion_title'
  | 'affirm'
  | 'affirm_subscription_payment_details'
  | 'affirm_subscription_text'
  | 'affirm_you_will_be_redirected'
  | 'all_features'
  | 'alt_text_product/bilbo/oura_difference_feature_1'
  | 'apple_health_google_fit_compatible'
  | 'automatic_firmware_updates'
  | 'automatic_nap_detection_body'
  | 'automatic_nap_detection_title'
  | 'available_2022'
  | 'available_android_2022'
  | 'available_now'
  | 'available_on_ios'
  | 'balance_activity_recovery'
  | 'banner_accept_all'
  | 'banner_allow_all'
  | 'banner_consent_to_cookies'
  | 'banner_content'
  | 'banner_deny_all'
  | 'banner_message_christmas_holiday'
  | 'banner_message_free_shipping'
  | 'bedtime_guidance'
  | 'bedtime_guidance_body'
  | 'bilbo_banner_message_free_upgrade'
  | 'bilbo_banner_message_tell_a_friend'
  | 'bilbo_banner_message_upgrader'
  | 'bilbo_battery_life'
  | 'bilbo_get_yours_banner_button_text'
  | 'bilbo_get_yours_banner_preorder_subcopy'
  | 'bilbo_get_yours_banner_subcopy'
  | 'bilbo_get_yours_banner_title'
  | 'bilbo_get_yours_banner_variant_button_text'
  | 'breakage_from_drops'
  | 'business_api_docs'
  | 'business_api_get_started'
  | 'business_api_text'
  | 'business_api_title'
  | 'business_banner_subtitle'
  | 'business_business_in_good_health'
  | 'business_contact_us'
  | 'business_for_researchers_text'
  | 'business_for_researchers_title'
  | 'business_hrm_text'
  | 'business_hrm_title'
  | 'business_learn_more'
  | 'business_minimum_contract_required'
  | 'business_oura_for_business'
  | 'business_oura_teams'
  | 'business_oura_teams_paragraph1'
  | 'business_oura_teams_paragraph2'
  | 'business_oura_teams_paragraph3'
  | 'business_quote_nascar_text'
  | 'business_quote_nba_text'
  | 'business_quote_nba_title'
  | 'business_quote_ufc_text'
  | 'business_quote_ufc_title'
  | 'business_see_why'
  | 'business_trusted_by_brands'
  | 'buy'
  | 'call_to_action_button_text'
  | 'call_to_action_title'
  | 'call_to_action_title_2'
  | 'cancel_content'
  | 'cancel_title'
  | 'cart'
  | 'cart_add'
  | 'cart_add_extended_warranty'
  | 'cart_cart'
  | 'cart_continue_shopping'
  | 'cart_coupon'
  | 'cart_duties_message'
  | 'cart_free'
  | 'cart_free_for_life'
  | 'cart_free_shipping_message'
  | 'cart_free_shipping_usd_message'
  | 'cart_noitems'
  | 'cart_one_item_per_order'
  | 'cart_paypal'
  | 'cart_price'
  | 'cart_quantity'
  | 'cart_remove'
  | 'cart_return_notice'
  | 'cart_selectsize'
  | 'cart_selectstyle'
  | 'cart_shipping'
  | 'cart_shipping_message'
  | 'cart_shopnow'
  | 'cart_sizing_kit_description'
  | 'cart_step1'
  | 'cart_step2'
  | 'cart_step3'
  | 'cart_subscription_item_description'
  | 'cart_subtotal'
  | 'cart_tax'
  | 'cart_total'
  | 'cart_usd_message'
  | 'cart_warranty'
  | 'checkout'
  | 'checkout_3ds_error_failure'
  | 'checkout_3ds_error_notloaded'
  | 'checkout_accountemail'
  | 'checkout_accountemaildescription'
  | 'checkout_accountemaildescription_gift'
  | 'checkout_accountemaildescription_link'
  | 'checkout_additional_details_kit'
  | 'checkout_additional_details_ring'
  | 'checkout_additional_details_subs_1'
  | 'checkout_additional_details_subs_2'
  | 'checkout_affirm_content'
  | 'checkout_affirm_failed'
  | 'checkout_affirm_loading'
  | 'checkout_affirm_title'
  | 'checkout_agreement'
  | 'checkout_alert_text'
  | 'checkout_alert_text_christmas_holiday'
  | 'checkout_api_error'
  | 'checkout_api_error_audexchange'
  | 'checkout_api_error_exchangegbp'
  | 'checkout_api_error_exchangenz'
  | 'checkout_api_error_nexus'
  | 'checkout_api_error_taxcalculate'
  | 'checkout_api_error_taxpostalcode'
  | 'checkout_api_error_taxrate'
  | 'checkout_billingaddress'
  | 'checkout_billingshippingsame'
  | 'checkout_cant_load_paypal'
  | 'checkout_continue_button'
  | 'checkout_continuepayment'
  | 'checkout_email_agreement'
  | 'checkout_email_gift_help_link'
  | 'checkout_email_signup'
  | 'checkout_error_affirm'
  | 'checkout_error_billingaddress'
  | 'checkout_error_email'
  | 'checkout_error_general'
  | 'checkout_error_lid'
  | 'checkout_error_onrecoverable'
  | 'checkout_error_shippingaddress'
  | 'checkout_form_100characters'
  | 'checkout_form_22characters'
  | 'checkout_form_2characters'
  | 'checkout_form_32characters'
  | 'checkout_form_40characters'
  | 'checkout_form_83characters'
  | 'checkout_form_address'
  | 'checkout_form_apartment'
  | 'checkout_form_cardholder_name'
  | 'checkout_form_cardnumber'
  | 'checkout_form_city'
  | 'checkout_form_company'
  | 'checkout_form_country'
  | 'checkout_form_cvv'
  | 'checkout_form_email'
  | 'checkout_form_email_confirm'
  | 'checkout_form_email_gift_buyer'
  | 'checkout_form_email_match'
  | 'checkout_form_emailerror'
  | 'checkout_form_emailformat'
  | 'checkout_form_emailrequired'
  | 'checkout_form_expirationmonth'
  | 'checkout_form_expirationyear'
  | 'checkout_form_firstname'
  | 'checkout_form_gift'
  | 'checkout_form_lastname'
  | 'checkout_form_phone'
  | 'checkout_form_phoneinvalid'
  | 'checkout_form_postal_code_pattern'
  | 'checkout_form_postal_code_string'
  | 'checkout_form_recipient'
  | 'checkout_form_recipients_address'
  | 'checkout_form_recipients_city'
  | 'checkout_form_recipients_company'
  | 'checkout_form_recipients_country'
  | 'checkout_form_recipients_email'
  | 'checkout_form_recipients_email_confirm'
  | 'checkout_form_recipients_firstname'
  | 'checkout_form_recipients_lastname'
  | 'checkout_form_recipients_phone'
  | 'checkout_form_recipients_state'
  | 'checkout_form_recipients_vat_number'
  | 'checkout_form_recipients_zip'
  | 'checkout_form_required'
  | 'checkout_form_state'
  | 'checkout_form_vat'
  | 'checkout_form_vat_number'
  | 'checkout_form_zip'
  | 'checkout_free_ring_copy'
  | 'checkout_gift_learnmore'
  | 'checkout_no_shipping_methods'
  | 'checkout_order_table_free'
  | 'checkout_order_table_qty'
  | 'checkout_order_table_total'
  | 'checkout_payment'
  | 'checkout_payment_3ds_error'
  | 'checkout_payment_captcha_error'
  | 'checkout_payment_error'
  | 'checkout_payment_funds_error'
  | 'checkout_payment_generic_error'
  | 'checkout_payment_invalid_card_error'
  | 'checkout_payment_subscription'
  | 'checkout_paypal_auth_notice'
  | 'checkout_paypal_auth_success'
  | 'checkout_paypal_content'
  | 'checkout_paypal_error'
  | 'checkout_paypal_error_failure'
  | 'checkout_paypal_error_incomplete'
  | 'checkout_paypal_error_notloaded'
  | 'checkout_phone_popup'
  | 'checkout_placeorder'
  | 'checkout_privacypolicy'
  | 'checkout_privacypolicy_link_text'
  | 'checkout_proceed'
  | 'checkout_processing_order'
  | 'checkout_returntocart'
  | 'checkout_shipping_address_info_gift_link_text'
  | 'checkout_shipping_method'
  | 'checkout_shipping_sizing_kit'
  | 'checkout_shippingaddress'
  | 'checkout_shippingaddress_info'
  | 'checkout_shippinginformation'
  | 'checkout_shopify_error'
  | 'checkout_subscription_disclaimer'
  | 'checkout_subscription_title'
  | 'checkout_summary_billing_address'
  | 'checkout_summary_delivery_method'
  | 'checkout_summary_free_trial_terms'
  | 'checkout_summary_gift_order_placed'
  | 'checkout_summary_intro'
  | 'checkout_summary_lifetime_membership'
  | 'checkout_summary_lifetime_membership_terms'
  | 'checkout_summary_news'
  | 'checkout_summary_order_confirmation'
  | 'checkout_summary_order_details'
  | 'checkout_summary_order_placed'
  | 'checkout_summary_payment'
  | 'checkout_summary_phone'
  | 'checkout_summary_recipient'
  | 'checkout_summary_shipping_address'
  | 'checkout_summary_tellafriend_offer'
  | 'checkout_summary_thank_you'
  | 'checkout_summary_trial_membership'
  | 'checkout_termsandconditions'
  | 'checkout_termsandconditions_link_text'
  | 'checkout_updating'
  | 'checkout_warranty_replacement_copy'
  | 'choose_your_finish'
  | 'choose_your_plan'
  | 'choose_your_size'
  | 'claim_your_offer'
  | 'common_email_address'
  | 'common_phone_number'
  | 'common_submit'
  | 'comparison_accuracy'
  | 'comparison_accurate'
  | 'comparison_battery'
  | 'comparison_comfortable'
  | 'comparison_no_disruption'
  | 'comparison_sensors'
  | 'comparison_sleep_quality'
  | 'comparison_sleep_tracking'
  | 'comparison_sleep_tracking_2'
  | 'comparison_water_resistant'
  | 'comparisons_competitor_title'
  | 'comparisons_oura_title'
  | 'confirm_your_size'
  | 'continue'
  | 'cookie_category_advertising'
  | 'cookie_category_functional'
  | 'cookie_category_marketing'
  | 'cookie_description_advertising'
  | 'cookie_description_functional'
  | 'cookie_description_marketing'
  | 'cookie_example_advertising'
  | 'cookie_example_functional'
  | 'cookie_example_marketing'
  | 'cookie_title'
  | 'daytime_hr'
  | 'default_cookie_allow'
  | 'default_cookie_category'
  | 'default_cookie_purpose'
  | 'default_cookie_tools'
  | 'edit'
  | 'electrical_damage'
  | 'error_subscription_error'
  | 'esc_modal_continue'
  | 'esc_modal_edit'
  | 'esc_modal_info_1'
  | 'esc_modal_info_2'
  | 'esc_modal_info_3'
  | 'esc_modal_text'
  | 'esc_modal_title'
  | 'extend_terms'
  | 'extend_your_warranty'
  | 'extended_warranty_2_year_price'
  | 'extended_warranty_3_year_price'
  | 'extended_warranty_included'
  | 'extended_warranty_learn_more'
  | 'extended_warranty_one_year'
  | 'extended_warranty_one_year_text'
  | 'extended_warranty_pdp_content'
  | 'extended_warranty_select'
  | 'extended_warranty_three_year'
  | 'extended_warranty_title'
  | 'extended_warranty_two_year'
  | 'extended_warranty_us_only'
  | 'extended_warranty_us_only_caption'
  | 'features'
  | 'flash_memory_size'
  | 'footer_about_us'
  | 'footer_accessibility'
  | 'footer_careers'
  | 'footer_contact'
  | 'footer_copyright'
  | 'footer_dataprotect_1'
  | 'footer_dataprotect_2'
  | 'footer_email'
  | 'footer_extra_charger'
  | 'footer_help'
  | 'footer_ip_notice'
  | 'footer_my_account'
  | 'footer_my_order'
  | 'footer_newsletter_label'
  | 'footer_oura_for_business'
  | 'footer_oura_on_the_web'
  | 'footer_patents'
  | 'footer_press'
  | 'footer_privacy_policy'
  | 'footer_pulse_blog'
  | 'footer_sizing'
  | 'footer_terms_and_conditions'
  | 'footer_thanks_for_subscribing'
  | 'footer_the_oura_app'
  | 'footnote_affirm'
  | 'footnote_gold_standard'
  | 'footnote_mothers_day'
  | 'footnote_oura_accuracy'
  | 'footnote_period_prediction'
  | 'footnote_sleep_algorithm'
  | 'footnote_spo2'
  | 'footnote_warranty'
  | 'footnote_workout_heartrate'
  | 'free_membership_included'
  | 'free_shipping'
  | 'free_upgrade_benefits_details'
  | 'frontpage_accolades'
  | 'frontpage_accolades_ny_post'
  | 'frontpage_accolades_techcrunch'
  | 'frontpage_accolades_ucsf'
  | 'frontpage_accolades_wearable'
  | 'frontpage_accurate_health_information'
  | 'frontpage_blog_pulse_blog'
  | 'frontpage_blog_read'
  | 'frontpage_blog_read_all'
  | 'frontpage_blog_stages_of_sleep'
  | 'frontpage_blog_tips_for_better'
  | 'frontpage_blog_what_is_hrm'
  | 'frontpage_know_why_you_feel'
  | 'frontpage_know_why_you_feel_description'
  | 'frontpage_learn_more'
  | 'frontpage_life_with_oura'
  | 'frontpage_life_with_oura_description'
  | 'frontpage_meet_ouraring'
  | 'frontpage_oura_for_business'
  | 'frontpage_oura_for_business_description'
  | 'gen_2'
  | 'gen_3'
  | 'guided_audio_sessions'
  | 'guided_audio_sessions_body'
  | 'guided_audio_video_more'
  | 'guided_sessions_audio_1_label'
  | 'guided_sessions_audio_2_label'
  | 'guided_sessions_audio_3_label'
  | 'guided_sessions_description'
  | 'guided_sessions_highlight_2_description'
  | 'guided_sessions_highlight_2_title'
  | 'guided_sessions_highlight_3_description'
  | 'guided_sessions_highlight_3_title'
  | 'guided_sessions_highlight_description'
  | 'guided_sessions_highlight_title'
  | 'guided_sessions_title'
  | 'guided_sessions_title_variant'
  | 'header_accessibility'
  | 'header_life_with_oura'
  | 'header_meet_oura_ring'
  | 'header_meet_the_community'
  | 'header_privacy_policy'
  | 'header_pulse_blog'
  | 'header_shop_label_preorder'
  | 'header_shop_label_upgrade'
  | 'header_shop_now'
  | 'header_terms_and_conditions'
  | 'header_the_pulse_blog'
  | 'heartrate_monitoring_intro'
  | 'heartrate_monitoring_intro_variant'
  | 'heartrate_monitoring_title'
  | 'hello_oura'
  | 'heres_what_to_expect'
  | 'hero_button_mothers_day'
  | 'hero_teaser_ad_landing'
  | 'hero_teaser_mothers_day'
  | 'hero_teaser_variant_one'
  | 'hero_teaser_variant_two'
  | 'hero_title_ad_landing'
  | 'hero_title_ad_landing_mobile'
  | 'hero_title_ad_landing_prefix'
  | 'hero_title_mothers_day'
  | 'hero_title_variant_one'
  | 'home_breathe_in'
  | 'home_heartrate_activating_2021'
  | 'home_heartrate_daytime_text'
  | 'home_heartrate_daytime_title'
  | 'home_heartrate_restorative_text'
  | 'home_heartrate_restorative_title'
  | 'home_heartrate_workout_text'
  | 'home_heartrate_workout_title'
  | 'home_scores_activity_text'
  | 'home_scores_activity_title'
  | 'home_scores_readiness_text'
  | 'home_scores_readiness_title'
  | 'home_scores_sleep_text'
  | 'home_scores_sleep_title'
  | 'home_scores_slideshow_title'
  | 'home_sleep_accuracy_intro'
  | 'home_sleep_accuracy_title'
  | 'keeps_pace_with_your_life'
  | 'learning-and-dev-budget'
  | 'legacy_cart_warranty'
  | 'lightweight_titanium_durable'
  | 'line_item_desc_ring'
  | 'loading'
  | 'maintenance_checkout_unavailable'
  | 'maintenance_email_error'
  | 'maintenance_thank_you'
  | 'manage_cookies'
  | 'manufacturing_defects'
  | 'meet_oura_ring_7_days_battery'
  | 'meet_oura_ring_HRV'
  | 'meet_oura_ring_accelerometer'
  | 'meet_oura_ring_accelerometer_description'
  | 'meet_oura_ring_activity'
  | 'meet_oura_ring_activity_levels'
  | 'meet_oura_ring_battery_and_power'
  | 'meet_oura_ring_battery_life'
  | 'meet_oura_ring_bluetooth'
  | 'meet_oura_ring_body_temperature'
  | 'meet_oura_ring_buy_now'
  | 'meet_oura_ring_calories'
  | 'meet_oura_ring_connect_with_your_body'
  | 'meet_oura_ring_connectivity'
  | 'meet_oura_ring_deep_sleep_rem'
  | 'meet_oura_ring_direct_from_arteries'
  | 'meet_oura_ring_discover_what_you_can'
  | 'meet_oura_ring_doctors'
  | 'meet_oura_ring_durable_titanium'
  | 'meet_oura_ring_emf_safe'
  | 'meet_oura_ring_explore_science'
  | 'meet_oura_ring_full_charge'
  | 'meet_oura_ring_google_apple_health'
  | 'meet_oura_ring_google_apple_health_description'
  | 'meet_oura_ring_google_apple_health_description_2'
  | 'meet_oura_ring_health_information'
  | 'meet_oura_ring_health_journey_1'
  | 'meet_oura_ring_health_journey_2'
  | 'meet_oura_ring_inactive_times'
  | 'meet_oura_ring_inactivity_alerts'
  | 'meet_oura_ring_infrared_light'
  | 'meet_oura_ring_learn_more'
  | 'meet_oura_ring_life_with'
  | 'meet_oura_ring_look_forward'
  | 'meet_oura_ring_materials'
  | 'meet_oura_ring_measure_during_day'
  | 'meet_oura_ring_measured_during_sleep'
  | 'meet_oura_ring_measurement_from_your_finger'
  | 'meet_oura_ring_naps'
  | 'meet_oura_ring_new_oura_ring'
  | 'meet_oura_ring_nighttime_movement'
  | 'meet_oura_ring_non_allergenic'
  | 'meet_oura_ring_ntc_sensor'
  | 'meet_oura_ring_ntc_sensor_description'
  | 'meet_oura_ring_oura'
  | 'meet_oura_ring_oura_combines'
  | 'meet_oura_ring_oura_infrared_description'
  | 'meet_oura_ring_oura_makes_sense'
  | 'meet_oura_ring_oura_makes_sense_content'
  | 'meet_oura_ring_oura_monitors'
  | 'meet_oura_ring_pvd_coating'
  | 'meet_oura_ring_readiness'
  | 'meet_oura_ring_rem_sleep'
  | 'meet_oura_ring_respiratory_rate'
  | 'meet_oura_ring_resting_heart_rate'
  | 'meet_oura_ring_scroll_to_discover'
  | 'meet_oura_ring_sleep'
  | 'meet_oura_ring_sleep_timing_and_quality'
  | 'meet_oura_ring_specs'
  | 'meet_oura_ring_steps'
  | 'meet_oura_ring_thickness'
  | 'meet_oura_ring_three_simple_scores'
  | 'meet_oura_ring_waterproof'
  | 'meet_oura_ring_weight'
  | 'meet_oura_ring_weight_dimessions'
  | 'meet_oura_ring_width'
  | 'meet_the_community_promo_chris_paul_quote'
  | 'meet_the_community_promo_kai_lenny_quote'
  | 'meet_the_community_promo_laura_quote'
  | 'meet_the_community_promo_lindsey_vonn_quote'
  | 'meet_the_community_promo_read_stories'
  | 'meet_the_community_promo_title'
  | 'membership_payment_method'
  | 'modal_add_warranty'
  | 'modal_warranty_cancel'
  | 'moments'
  | 'moments_body'
  | 'more_information'
  | 'my_account_add_payment'
  | 'my_account_billing_history_no_invoices'
  | 'my_account_billing_history_table_head_amount'
  | 'my_account_billing_history_table_head_date'
  | 'my_account_billing_history_title'
  | 'my_account_cancel_membership_modal_button_confirm'
  | 'my_account_cancel_membership_modal_button_keep'
  | 'my_account_cancel_membership_modal_error'
  | 'my_account_cancel_membership_modal_intro'
  | 'my_account_cancel_membership_modal_outro'
  | 'my_account_cancel_membership_modal_title'
  | 'my_account_current_payment_method_title'
  | 'my_account_email_error'
  | 'my_account_email_success'
  | 'my_account_general_error'
  | 'my_account_membership_coming_soon'
  | 'my_account_membership_error'
  | 'my_account_membership_unavailable'
  | 'my_account_navigate_back'
  | 'my_account_next_billing_date'
  | 'my_account_order_delivered'
  | 'my_account_order_pending_approval'
  | 'my_account_order_pending_fulfillment'
  | 'my_account_order_ring_size_needed'
  | 'my_account_orders_mission'
  | 'my_account_save_payment'
  | 'my_account_saved_payment_method_last4'
  | 'my_account_sub_action_header'
  | 'my_account_sub_active'
  | 'my_account_sub_active_billing_rate'
  | 'my_account_sub_active_lifetime'
  | 'my_account_sub_active_trial'
  | 'my_account_sub_active_trial_has_payment'
  | 'my_account_sub_active_trial_no_payment'
  | 'my_account_sub_cancel_subscription'
  | 'my_account_sub_cancelled_active'
  | 'my_account_sub_cancelled_inactive'
  | 'my_account_sub_edit_payment'
  | 'my_account_sub_inactive'
  | 'my_account_sub_inactive_default'
  | 'my_account_sub_inactive_trial'
  | 'my_account_sub_learn_more'
  | 'my_account_sub_payment_failed'
  | 'my_account_sub_payment_header'
  | 'my_account_sub_payment_history'
  | 'my_account_sub_pending'
  | 'my_account_sub_pending_lifetime'
  | 'my_account_sub_pending_sixmonth'
  | 'my_account_sub_renew_payment'
  | 'my_account_sub_status_header'
  | 'my_account_subscription_amount'
  | 'my_account_subscription_renew_failure'
  | 'my_account_subscription_renew_success'
  | 'my_account_subscription_term_month'
  | 'my_account_tabs_membership'
  | 'my_account_tabs_orders'
  | 'my_account_update_size_confirmation'
  | 'my_account_update_size_confirmation_shipping_delay'
  | 'my_account_update_size_error'
  | 'myaccount_paypal_auth_success'
  | 'new'
  | 'next'
  | 'next_button'
  | 'no'
  | 'online_claims'
  | 'or'
  | 'order_ledger_discount'
  | 'order_ledger_shipping'
  | 'order_ledger_subtotal'
  | 'order_ledger_tax'
  | 'order_ledger_tax_exempt'
  | 'order_ledger_tax_included'
  | 'oura_difference_comfortable_label'
  | 'oura_difference_comfortable_summary'
  | 'oura_difference_sleep_label'
  | 'oura_difference_title'
  | 'oura_difference_wellness_label'
  | 'oura_difference_wellness_summary'
  | 'oura_features_activity_description'
  | 'oura_features_activity_title'
  | 'oura_features_heart_rate_description'
  | 'oura_features_heart_rate_title'
  | 'oura_features_readiness_description'
  | 'oura_features_readiness_title'
  | 'oura_features_sickness_description'
  | 'oura_features_sickness_title'
  | 'oura_features_sleep_lab_description'
  | 'oura_features_sleep_lab_title'
  | 'oura_features_subtitle'
  | 'oura_features_title'
  | 'oura_membership'
  | 'oura_membership_country_restriction'
  | 'oura_membership_country_restriction_learn_more'
  | 'oura_membership_details'
  | 'oura_ring_sizing'
  | 'oura_stickers'
  | 'oura_stickers_body'
  | 'pdp_accurate_sleep_tracker_text'
  | 'pdp_accurate_sleep_tracker_title'
  | 'pdp_activity_fitness_tracking_text'
  | 'pdp_activity_fitness_tracking_title'
  | 'pdp_add_to_cart'
  | 'pdp_automatically_log'
  | 'pdp_body_temperature_paragraph_1'
  | 'pdp_body_temperature_paragraph_2'
  | 'pdp_charger_set_contains_cable'
  | 'pdp_charger_set_contains_charger'
  | 'pdp_discount_applied'
  | 'pdp_discount_applied_taf'
  | 'pdp_discount_error'
  | 'pdp_discount_error_expired'
  | 'pdp_discount_error_used'
  | 'pdp_heart_rate'
  | 'pdp_heart_rate_paragraph_1'
  | 'pdp_heart_rate_paragraph_2'
  | 'pdp_highlights'
  | 'pdp_highlights_battery_life'
  | 'pdp_highlights_battery_life_body'
  | 'pdp_highlights_charger'
  | 'pdp_highlights_charger_body'
  | 'pdp_highlights_sizing_kit'
  | 'pdp_highlights_sizing_kit_body'
  | 'pdp_highlights_titanium'
  | 'pdp_highlights_titanium_body'
  | 'pdp_highlights_water_resistant'
  | 'pdp_highlights_water_resistant_body'
  | 'pdp_insights'
  | 'pdp_insights_body'
  | 'pdp_invite_applied'
  | 'pdp_invite_error'
  | 'pdp_invite_error_expired'
  | 'pdp_invite_error_used'
  | 'pdp_know_your_size'
  | 'pdp_life_with_oura_app'
  | 'pdp_life_with_oura_app_activity'
  | 'pdp_life_with_oura_app_activity_body'
  | 'pdp_life_with_oura_app_know_ready'
  | 'pdp_life_with_oura_app_know_ready_body'
  | 'pdp_life_with_oura_app_os'
  | 'pdp_life_with_oura_app_os_body'
  | 'pdp_life_with_oura_app_trends'
  | 'pdp_life_with_oura_app_trends_body'
  | 'pdp_life_with_oura_app_understand_sleep'
  | 'pdp_life_with_oura_app_understand_sleep_body'
  | 'pdp_life_with_oura_ring'
  | 'pdp_life_with_oura_ring_accuracy'
  | 'pdp_life_with_oura_ring_accuracy_body'
  | 'pdp_life_with_oura_ring_comfort'
  | 'pdp_life_with_oura_ring_comfort_body'
  | 'pdp_life_with_oura_ring_lifestyle'
  | 'pdp_life_with_oura_ring_lifestyle_body'
  | 'pdp_meditate'
  | 'pdp_meditations_sessions_text'
  | 'pdp_meditations_sessions_title'
  | 'pdp_nap_activity_detection_text'
  | 'pdp_nap_activity_detection_title'
  | 'pdp_oura_difference_title'
  | 'pdp_period_predicition_text'
  | 'pdp_period_prediction_title'
  | 'pdp_return_period'
  | 'pdp_return_period_body'
  | 'pdp_ring_color_black_description'
  | 'pdp_ring_color_black_title'
  | 'pdp_ring_color_gold_description'
  | 'pdp_ring_color_gold_title'
  | 'pdp_ring_color_silver_description'
  | 'pdp_ring_color_silver_label'
  | 'pdp_ring_color_stealth_description'
  | 'pdp_ring_color_stealth_title'
  | 'pdp_select_size'
  | 'pdp_select_style_and_finish'
  | 'pdp_seo_description_balance'
  | 'pdp_seo_description_charger_set'
  | 'pdp_seo_description_diamond'
  | 'pdp_seo_description_gift_card'
  | 'pdp_seo_description_heritage'
  | 'pdp_seo_description_sizing_kit'
  | 'pdp_seo_description_stealth'
  | 'pdp_seo_title_balance_black'
  | 'pdp_seo_title_balance_diamond'
  | 'pdp_seo_title_balance_silver'
  | 'pdp_seo_title_charger_set'
  | 'pdp_seo_title_gift_card'
  | 'pdp_seo_title_heritage_black'
  | 'pdp_seo_title_heritage_gold'
  | 'pdp_seo_title_heritage_silver'
  | 'pdp_seo_title_sizing_kit'
  | 'pdp_seo_title_stealth'
  | 'pdp_shop_with_confidence'
  | 'pdp_size'
  | 'pdp_size_selector_know_size'
  | 'pdp_size_selector_label'
  | 'pdp_stay_active'
  | 'pdp_stay_active_body'
  | 'pdp_step'
  | 'pdp_use_sizing_kit'
  | 'pdp_use_sizing_kit_step1'
  | 'pdp_use_sizing_kit_step2'
  | 'pdp_use_sizing_kit_step3'
  | 'pdp_use_sizing_kit_step4'
  | 'pdp_warranty'
  | 'pdp_warranty_body'
  | 'period_predicition_body'
  | 'period_predicition_title'
  | 'period_prediction'
  | 'period_prediction_description'
  | 'period_prediction_see_the_future_description'
  | 'period_prediction_see_the_future_title'
  | 'period_prediction_smarter_description'
  | 'period_prediction_smarter_title'
  | 'period_prediction_subtitle'
  | 'period_prediction_whole_picture_description'
  | 'period_prediction_whole_picture_title'
  | 'pre_order'
  | 'product_closeup_accurate_description'
  | 'product_closeup_accurate_title'
  | 'product_closeup_battery_description'
  | 'product_closeup_battery_title'
  | 'product_closeup_description'
  | 'product_closeup_design_description'
  | 'product_closeup_design_title'
  | 'product_closeup_sensors_description'
  | 'product_closeup_sensors_title'
  | 'product_closeup_title'
  | 'product_inner_potential_slideshow_title'
  | 'product_size_title'
  | 'product_specs_apple_google_health_body'
  | 'product_specs_apple_google_health_title'
  | 'protection_plan'
  | 'readiness_sequence_subtitle'
  | 'readiness_sequence_title'
  | 'realize_potential_adapts'
  | 'realize_potential_guided_sessions'
  | 'realize_potential_monitoring'
  | 'realize_potential_sensors'
  | 'realize_potential_sleep_analysis'
  | 'realize_potential_title'
  | 'recipients_shipping_info'
  | 'reponds_to_you_aad_title'
  | 'research_grade_sensors'
  | 'responds_to_you_aad_description'
  | 'responds_to_you_description'
  | 'responds_to_you_nap_description'
  | 'responds_to_you_nap_title'
  | 'responds_to_you_rest_description'
  | 'responds_to_you_rest_title'
  | 'responds_to_you_title'
  | 'rest_mode'
  | 'rest_mode_body'
  | 'restorative_time'
  | 'restorative_time_body'
  | 'retry'
  | 'ring_gen_3'
  | 'ring_payment_method'
  | 'save'
  | 'scroll_teaser'
  | 'shipping_method_expedited_air'
  | 'shipping_method_standard'
  | 'sizing_choose_finger_text'
  | 'sizing_choose_finger_title'
  | 'sizing_comfortable_fit_text'
  | 'sizing_comfortable_fit_title'
  | 'sizing_confirm_size'
  | 'sizing_evaluate_fit_text'
  | 'sizing_evaluate_fit_title'
  | 'sizing_faq'
  | 'sizing_kit_details'
  | 'sizing_kit_details_upgrader'
  | 'sizing_kit_step_1'
  | 'sizing_kit_step_2'
  | 'sizing_kit_step_3'
  | 'sizing_more_information'
  | 'sizing_my_account_link'
  | 'sizing_test_fit_text'
  | 'sizing_test_fit_title'
  | 'sizing_tips'
  | 'sizing_title'
  | 'sleep_accuracy_algo_description'
  | 'sleep_accuracy_algo_title'
  | 'sleep_accuracy_date'
  | 'sleep_accuracy_heart_rate'
  | 'sleep_accuracy_hrv'
  | 'sleep_accuracy_insights_description'
  | 'sleep_accuracy_insights_title'
  | 'sleep_accuracy_perfect_description'
  | 'sleep_accuracy_perfect_title'
  | 'sleep_accuracy_spo2_activation'
  | 'sleep_accuracy_spo2_description'
  | 'sleep_accuracy_spo2_title'
  | 'sleep_activity_and_readiness_body'
  | 'sleep_activity_and_readiness_title'
  | 'sleep_advertorial_matthew_walker_quote'
  | 'sleep_advertorial_matthew_walker_title'
  | 'sleep_advertorial_paragraph_1'
  | 'sleep_advertorial_paragraph_2'
  | 'sleep_advertorial_paragraph_3'
  | 'sleep_advertorial_title'
  | 'sleep_advertorial_track_sleep_paragraph'
  | 'sleep_advertorial_track_sleep_title'
  | 'sleep_advertorial_variant_paragraph_1'
  | 'sleep_advertorial_variant_paragraph_2'
  | 'sleep_advertorial_variant_paragraph_3'
  | 'sleep_advertorial_variant_title'
  | 'sleep_benefits_boost_immunity_label'
  | 'sleep_benefits_boost_immunity_summary'
  | 'sleep_benefits_boost_memory_label'
  | 'sleep_benefits_boost_memory_summary'
  | 'sleep_benefits_heart_health_label'
  | 'sleep_benefits_heart_health_summary'
  | 'sleep_benefits_manage_stress_label'
  | 'sleep_benefits_manage_stress_summary'
  | 'sleep_benefits_manage_weight_label'
  | 'sleep_benefits_manage_weight_summary'
  | 'sleep_benefits_reduce_dementia'
  | 'sleep_benefits_reduce_dementia_summary'
  | 'sleep_benefits_title'
  | 'sleep_blog_cta'
  | 'sleep_blog_more_deep_sleep_title'
  | 'sleep_blog_stages_of_sleep_title'
  | 'sleep_blog_weight_loss_title'
  | 'sleep_carousel_hero_subtitle'
  | 'sleep_carousel_hero_title'
  | 'sleep_comparisons_subtitle'
  | 'sleep_features_bedtime_guidance_description'
  | 'sleep_features_bedtime_guidance_title'
  | 'sleep_features_nap_detection_description'
  | 'sleep_features_nap_detection_title'
  | 'sleep_features_sleep_score_description'
  | 'sleep_features_sleep_score_title'
  | 'sleep_features_sleep_sounds_description'
  | 'sleep_features_sleep_sounds_title'
  | 'sleep_features_sleep_stages_description'
  | 'sleep_features_sleep_stages_title'
  | 'sleep_features_subtitle'
  | 'sleep_features_tags_insights_description'
  | 'sleep_features_tags_insights_title'
  | 'sleep_features_title'
  | 'sleep_features_variant_title'
  | 'sleep_insights_devin_m'
  | 'sleep_insights_geoff_a'
  | 'sleep_insights_helma_l'
  | 'sleep_insights_paul_g'
  | 'sleep_insights_title'
  | 'sleep_insights_variant_title'
  | 'sleep_tips_bedtime_description'
  | 'sleep_tips_bedtime_title'
  | 'sleep_tips_caffeine_description'
  | 'sleep_tips_caffeine_title'
  | 'sleep_tips_daytime_schedule_description'
  | 'sleep_tips_daytime_schedule_title'
  | 'sleep_tips_dedicated_space_description'
  | 'sleep_tips_dedicated_space_title'
  | 'sleep_tips_keep_cool_description'
  | 'sleep_tips_keep_cool_title'
  | 'sleep_tips_min_light_description'
  | 'sleep_tips_min_light_title'
  | 'sleep_tips_nap_description'
  | 'sleep_tips_nap_title'
  | 'sleep_tips_nightcap_description'
  | 'sleep_tips_nightcap_title'
  | 'sleep_tips_summary'
  | 'sleep_tips_title'
  | 'sleep_tips_track_description'
  | 'sleep_tips_track_title'
  | 'sleep_tips_unwind_description'
  | 'sleep_tips_unwind_title'
  | 'smarter_software_improvements'
  | 'spo2_sensing'
  | 'spo2_sensing_body'
  | 'start_day_smarter_title'
  | 'submit'
  | 'submit_corrected_address'
  | 'subscription_monthly_amount'
  | 'suggested_address'
  | 'tags'
  | 'tags_body'
  | 'tech_specs'
  | 'temp_sensors_collage_text'
  | 'temp_sensors_cycle_description'
  | 'temp_sensors_cycle_picture_description'
  | 'temp_sensors_cycle_picture_title'
  | 'temp_sensors_cycle_predict_description'
  | 'temp_sensors_cycle_predict_title'
  | 'temp_sensors_cycle_smarter_description'
  | 'temp_sensors_cycle_smarter_title'
  | 'temp_sensors_cycle_title'
  | 'temp_sensors_description'
  | 'temp_sensors_title'
  | 'testimonial_carisamoore'
  | 'testimonial_chrispaul'
  | 'testimonial_kailenny'
  | 'testimonial_lindseyvonn'
  | 'testimonials_image_alt_carisamoore'
  | 'testimonials_image_alt_chrispaul'
  | 'testimonials_image_alt_kailenny'
  | 'testimonials_image_alt_lindseyvonn'
  | 'testimonials_image_alt_suvvey'
  | 'testimonials_title'
  | 'the_oura_difference'
  | 'the_oura_membership'
  | 'the_oura_membership_paragraph_1'
  | 'the_oura_membership_paragraph_2'
  | 'the_oura_membership_paragraph_3'
  | 'the_oura_membership_paragraph_3_upgraders'
  | 'the_oura_membership_paragraph_4'
  | 'the_oura_membership_terms'
  | 'the_oura_membership_terms_free_upgrade'
  | 'the_oura_membership_terms_upgraders'
  | 'trends'
  | 'trends_body'
  | 'unlimited-course'
  | 'updated_sleep_algorithm'
  | 'upgrade_benefits'
  | 'upgrade_benefits_details'
  | 'waitlist_submit'
  | 'waitlist_text'
  | 'warranty'
  | 'warranty_replacement_free_shipping'
  | 'warranty_status_fulfilled'
  | 'watch_the_video'
  | 'water_resistant_depth'
  | 'whats_new_gen_3'
  | 'why_oura'
  | 'workout_heartrate_insights_body'
  | 'workout_heartrate_insights_title'
  | 'workout_hr'
  | 'yes'
  | 'you_entered';

export type LocaleMessagesJson = Record<MessageKey, string>;

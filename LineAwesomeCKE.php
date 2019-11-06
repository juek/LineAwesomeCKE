<?php 
defined('is_running') or die('Not an entry point...');

class LineAwesomeCKE{

  /* action hook */
  static function GetHead(){
    global $page, $addonRelativeCode;
    $page->css_user[] = $addonRelativeCode . '/CKEditor_plugins/lineawesome-1.1/line-awesome/css/line-awesome.min.css';
    if( \gp\tool::LoggedIn() ){
      //$page->css_admin[] = $addonRelativeCode . '/LineAwesomeCKE.css';
      \gp\tool\Plugins::css('LineAwesomeCKE.css', false);
    }
  }

  /* filter hook */
  static function CKEditor_Plugins($plugins){
    global $addonRelativeCode;
    $plugins['widget']          = $addonRelativeCode . '/CKEditor_plugins/widget-4.5.11/';
    $plugins['widgetselection'] = $addonRelativeCode . '/CKEditor_plugins/widgetselection-4.6.2/';
    $plugins['lineutils']       = $addonRelativeCode . '/CKEditor_plugins/lineutils-4.5.11/';
    $plugins['lineawesome']     = $addonRelativeCode . '/CKEditor_plugins/lineawesome-1.1/';
    return $plugins;
  }

}

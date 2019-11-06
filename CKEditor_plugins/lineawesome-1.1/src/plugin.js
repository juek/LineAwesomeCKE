/**
 *
 * Line Awesome for CK Editor
 *
 * Authors  : Michael Janea (www.michaeljanea.com):
 *              - creator of the original FontAwesome plugin (v1.0 - v1.2)
 *            Juergen Krausz (www.grafikrausz.at):
 *              - updated for LineAwesome https://icons8.de/line-awesome
 *              - some other small modifications
 *
 * Version  : 1.1
 *
 */

CKEDITOR.dtd.$removeEmpty['span'] = false; 

CKEDITOR.plugins.add('lineawesome', {
  requires: 'widget',
  icons: 'lineawesome',
  init: function(editor) {
    if( typeof(editor.config.cols) == 'string' ){
      editor.addContentsCss(CKEDITOR.plugins.getPath('lineawesome') + 'line-awesome/css/line-awesome.min.css');
    }
    editor.widgets.add('LineAwesome', {
      button: 'Insert LineAwesome Icon',
      template: '<span class="" style=""></span>',
      dialog: 'lineawesomeDialog',
      allowedContent: 'span(!las){style}; span(!lab){style}',
      upcast: function(element) {
        return element.name == 'span' && (element.hasClass('las') || element.hasClass('lab'));
      },
      init: function() {
        this.setData('class', this.element.getAttribute('class'));
        this.setData('color', this.element.getStyle('color'));
        this.setData('size', this.element.getStyle('font-size'));
      },
      data: function() {
        var istayl = '';
        this.element.setAttribute('class', this.data.class);
        istayl += this.data.color != '' ? 'color:' + this.data.color + ';' : '';
        var font_size = this.data.size.trim();
        font_size = (font_size != '' && font_size == parseInt(font_size)) ? font_size + 'px' : font_size;
        istayl += font_size != '' ? 'font-size:' + font_size : '';

        istayl != '' ? this.element.setAttribute('style', istayl) : '';
        istayl == '' ? this.element.removeAttribute('style') : '';
      }
    });
    CKEDITOR.dialog.add('lineawesomeDialog', this.path + 'dialogs/lineawesome.js');
    CKEDITOR.document.appendStyleSheet(CKEDITOR.plugins.getPath('lineawesome') + 'line-awesome/css/line-awesome.min.css');
  }
});

# WP Foundation

A quick starter theme for WordPress based on Zurb's Foundation framework. This is a minimalistic theme that contains nothing more than the basic "code" to get you started. 

This theme comes preinstalled with the following frameworks/libraries;
* Zurb Foundation 5.
  * FastClick.
  * jQuery.
  * Modernizer.
  * Placeholder.
* FontAwesome.


## For begginer and advanced developpers

This theme is aimed to be used by both advanced developers (with knowledge of tools like; NodeJs, Grunt, Bower, SASS..) and also beginners on WordPress theme developpement.

#### Begginers (no knowledge of NodeJs, Grunt, SASS..)
Download the compiled zip file and start creating your theme the usual way. Further details in the "Theme structure" section bellow.

#### Developpers
The theme contains a ".src" folder (due to how WordPresss works, we made this sub directory to prevent spoiling the root folder with "developpement" source code), use it to add your SASS, JS, images.. Things you will be generating using Grunt tasks.

## Theme structure

We try to use a basic structure to get you quickly into the theme developpement:

* **.src** for developpers using NodeJs and Grunt to generate their themes; see **Gruntfile.js** and **src_assets**.
* **assets** folder contains styles, js code and images.
* **includes** folder contains your php files that you will be including like your modules and other libraries.
* **languages** folder contains translation strings for your theme.

### Functions.php; Modular structure

Instead of putting our whole php code inside the typical `functions.php` we prefer to separate the functions into blocks. That is, we’ll define our module structure based upon function. For instance, in our theme we’ll include a `_setup.php` module and we invoke it from `functions.php`.

### Where to edit the style?

### Where to add my javascript?

### What about images?

# Even faster!

You can find ready Foundation based code blocks to get you even quicker on building your theme. Checkout this resources:
*  [HTML Templates; Cook your site faster with some canned HTML](http://foundation.zurb.com/templates.html)
*  [Library; Building blocks](http://patterntap.com/code)


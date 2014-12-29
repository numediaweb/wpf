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

This theme is aimed to be used by both advanced developers and also beginners on WordPress theme developpement.

#### Begginers (no knowledge of NodeJs, Grunt, SASS..)

Download the [release zip](https://github.com/numediaweb/wpf/releases/latest) file, uncompress it into a your WordPress themes directory and start creating your theme the usual way. Further details in the [Theme structure](https://github.com/numediaweb/wpf#theme-structure) section bellow.

#### Developpers

If you are familiar with tools like; [NodeJs](http://nodejs.org/), [GruntJS](http://gruntjs.com/), [Bower](http://bower.io/), [SASS](http://sass-lang.com/), [Compass](http://compass-style.org/).. The theme contains a **.src** folder, use it to add your SASS, JS, images.. Things you will be generating using Grunt tasks.;
  * Clone this repo into your theme folder; `git clone https://github.com/numediaweb/wpf.git my_theme`.
  * You may want to change the remote's URL using something like; `git remote set-url origin https://github.com/USERNAME/REPOSITORY_2.git`.
  * Navigate to **.src** sub-folder; `cd my_theme/.src`
  * Open the `package.json` file and edit the name, version etc.. Do the same for `bower.json`
  * Now it is time to install required `node_modules` with; `npm install`
  * Install required `bower_components` with; `bower install`
  * Once done, test everything with; `grunt`



> Due to how WordPresss works, we made this sub directory to prevent spoiling the root folder with "developpement" source code.

## Theme structure

We try to use a basic structure to get you quickly into the theme developpement:

* **.src** for developpers using NodeJs and Grunt to generate their themes; see **Gruntfile.js** and **src_assets**.
* **assets** folder contains styles, js code and images.
* **includes** folder contains your php files that you will be including like your modules and other libraries. 

### Directory structure:

```
├── wpf/
│   ├── .src/
│   │   ├── bower_components/
│   │   ├── node_modules/
│   │   ├── src_assets/
│   │   │   ├── images/
│   │   │   ├── scripts/
│   │   │   ├── scss/
│   ├── assets/
│   │   ├── css/
│   │   ├── images/
│   │   ├── scripts/
│   ├── html/
│   │   ├── home.html
│   ├── footer.php
│   ├── functions.php
│   ├── index.php
│   ├── screenshot.png
│   ├── style.css
```

### Functions.php

Instead of putting our whole php code inside the typical `functions.php` we prefer to use a class containing our functions; wpf_classes.php

### Where to edit the style?

If you don't know how to use SASS then add your styles to `style.css` in the root folder. However, we recommand using SASS and build your styles following the structure you will find in the `.src/src_assets/scss`

### Where to edit my javascript?

The main js file is `.src/src_assets/scripts/app.js`, give it a check; it is self explanatory :)
We dropped support for `requirejs` as this arised many compatiblity issues with wordpress univers of plugins!

> The WordPress `wp_enqueue_script` is not compatible with RequireJS [yet](https://core.trac.wordpress.org/ticket/20558).

### What about images?

If you are using the NodeJs approach, then every image you put in `.src/src_assets/images/` will be minified and `assets/images/`when runing `grunt` task.

# Resources

You can find ready Foundation based code blocks to get you even quicker on building your theme. Checkout this resources:
*  [HTML Templates; Cook your site faster with some canned HTML](http://foundation.zurb.com/templates.html)
*  [Library; Building blocks](http://patterntap.com/code)

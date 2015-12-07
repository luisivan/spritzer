# Spritzer

I really liked the Spritz reading method so I made this tiny lib in Javascript.

``` html
<link rel="stylesheet" type="text/css" href="Spritzer.css">
<script src="Spritzer.js"></script>
```

``` html
<text>Spritz is a really cool reading method and this is a library implementing it using Javascript.</text>
```

``` javascript
var test = new Spritzer(domEl);
	
var text = document.getElementsByTagName('text')[0].innerHTML;	
	
var wordsPerMinute = 450;
	
test.render(text, wordsPerMinute);
```

See a demo at [http://luisivan.net/spritzer/](http://luisivan.net/spritzer/) & read more about Spritz at [http://learn2spritz.com/](http://learn2spritz.com/)
